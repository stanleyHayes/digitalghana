#!/usr/bin/env ruby

require "digest"
require "json"
require "pathname"

ROOT = Pathname.new(__dir__).parent.realpath
ERRORS = []

def error(message)
  ERRORS << message
end

def read_json(relative_path)
  path = ROOT.join(relative_path)
  JSON.parse(path.read)
rescue Errno::ENOENT
  error("missing JSON file: #{relative_path}")
  {}
rescue JSON::ParserError => e
  error("invalid JSON in #{relative_path}: #{e.message}")
  {}
end

required_files = %w[
  README.md
  AGENTS.md
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md
  agent_plan.md
  docs/adr/0001-federated-portfolio-architecture.md
  docs/governance/data-source-policy.md
  docs/governance/licensing-policy.md
  docs/standards/domain-and-dns.md
  docs/standards/product-lifecycle.md
  docs/runbooks/evidence/dns-inventory-2026-09-01.md
  docs/runbooks/evidence/provider-inventory-2026-09-01.md
  portfolio/products.json
  portfolio/products.schema.json
  docs/portfolio/source-manifest.json
  portfolio/source-manifest.schema.json
]

required_files.each do |relative_path|
  error("missing required file: #{relative_path}") unless ROOT.join(relative_path).file?
end

catalogue = read_json("portfolio/products.json")
products = catalogue.fetch("products", [])
error("catalogue domain must be digitalghana.dev") unless catalogue["domain"] == "digitalghana.dev"
error("catalogue must contain products") if products.empty?

dns = catalogue.fetch("dns", {})
error("missing authoritative DNS provider") if dns["authoritativeProvider"].to_s.empty?
nameservers = dns.fetch("nameservers", [])
error("at least two unique nameservers are required") if nameservers.uniq.length < 2
dns_evidence = dns["evidence"].to_s
error("missing DNS inventory evidence") if dns_evidence.empty? || !ROOT.join(dns_evidence).file?

control_plane = catalogue.fetch("controlPlane", {})
provider_evidence = control_plane["evidence"].to_s
error("missing provider inventory evidence") if provider_evidence.empty? || !ROOT.join(provider_evidence).file?
github = control_plane.fetch("github", {})
error("missing authenticated GitHub account") if github["authenticatedAccount"].to_s.empty?
error("invalid GitHub remote state") unless %w[missing configured].include?(github["remoteState"])
if github["remoteState"] == "configured" && github["remote"].to_s.empty?
  error("configured GitHub remote lacks URL")
end

allowed_lifecycles = %w[proposed planning building beta stable externally_blocked retired]
allowed_surface_states = %w[planned provisioning live redirect retired]
allowed_environments = %w[production staging preview]
allowed_kinds = %w[umbrella web api sandbox console admin gateway]
hostname_pattern = /\A(?:[a-z0-9-]+\.)*digitalghana\.dev\z/

ids = products.map { |product| product["id"] }
repositories = products.map { |product| product["repository"] }.compact
error("duplicate product id") unless ids.uniq.length == ids.length
error("duplicate repository owner") unless repositories.uniq.length == repositories.length

hostnames = []
products.each do |product|
  id = product["id"]
  error("invalid product id: #{id.inspect}") unless id.is_a?(String) && id.match?(/\A[a-z][a-z0-9-]*\z/)
  error("invalid lifecycle for #{id}") unless allowed_lifecycles.include?(product["lifecycle"])
  error("missing numeric order for #{id}") unless product["order"].is_a?(Integer) && product["order"] >= 0

  surfaces = product.fetch("surfaces", [])
  error("#{id} has no surfaces") if surfaces.empty?
  canonical_by_kind = Hash.new(0)

  surfaces.each do |surface|
    hostname = surface["hostname"]
    hostnames << hostname
    canonical_by_kind[surface["kind"]] += 1 if surface["canonical"]
    error("invalid hostname for #{id}: #{hostname.inspect}") unless hostname.is_a?(String) && hostname.match?(hostname_pattern)
    error("invalid surface kind for #{id}: #{surface['kind'].inspect}") unless allowed_kinds.include?(surface["kind"])
    error("invalid environment for #{hostname}") unless allowed_environments.include?(surface["environment"])
    error("invalid DNS state for #{hostname}") unless allowed_surface_states.include?(surface["state"])
    error("canonical must be boolean for #{hostname}") unless [true, false].include?(surface["canonical"])
    if surface["state"] == "live"
      error("live hostname lacks provider: #{hostname}") if surface["provider"].to_s.empty?
      error("live hostname lacks evidence: #{hostname}") if surface["evidence"].to_s.empty?
    end
  end

  canonical_by_kind.each do |kind, count|
    error("#{id} has #{count} canonical #{kind} surfaces") if count > 1
  end
end

error("duplicate hostname ownership") unless hostnames.uniq.length == hostnames.length

gateway = products.find { |product| product["id"] == "data" }
if gateway
  stable_domains = products.count { |product| !%w[portfolio data].include?(product["id"]) && product["lifecycle"] == "stable" }
  live_gateway = gateway.fetch("surfaces", []).any? { |surface| surface["kind"] == "gateway" && surface["state"] == "live" }
  error("GhanaData gateway cannot be live before three domain products are stable") if live_gateway && stable_domains < 3
else
  error("missing GhanaData gateway product")
end

manifest = read_json("docs/portfolio/source-manifest.json")
manifest.fetch("documents", []).each do |document|
  relative_path = document["path"]
  expected = document["sha256"]
  path = ROOT.join(relative_path.to_s)
  if !path.file?
    error("missing source document: #{relative_path}")
  elsif expected.to_s !~ /\A[a-f0-9]{64}\z/
    error("invalid SHA-256 in source manifest: #{relative_path}")
  else
    actual = Digest::SHA256.file(path).hexdigest
    error("source checksum changed: #{relative_path}") unless actual == expected
  end
end

nested_git = Dir.glob(ROOT.join("**/.git").to_s, File::FNM_DOTMATCH).reject { |path| Pathname.new(path).cleanpath == ROOT.join(".git").cleanpath }
error("nested Git repositories found: #{nested_git.join(', ')}") unless nested_git.empty?

Dir.glob(ROOT.join("**/*.md").to_s).each do |markdown_path|
  contents = File.read(markdown_path)
  contents.scan(/\[[^\]]+\]\(([^)]+)\)/).flatten.each do |raw_target|
    target = raw_target.sub(/\A</, "").sub(/>\z/, "").split("#", 2).first
    next if target.empty? || target.match?(/\A(?:https?:|mailto:)/)

    resolved = Pathname.new(markdown_path).dirname.join(target).cleanpath
    error("broken relative Markdown link in #{Pathname.new(markdown_path).relative_path_from(ROOT)}: #{raw_target}") unless resolved.exist?
  end
end

secret_patterns = {
  "private key" => /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  "AWS access key" => /\bAKIA[0-9A-Z]{16}\b/,
  "GitHub token" => /\bgh[opsu]_[A-Za-z0-9]{36,}\b/,
  "Slack token" => /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/
}
text_extensions = %w[.md .json .rb .yml .yaml .txt .example]
Dir.glob(ROOT.join("**/*").to_s, File::FNM_DOTMATCH).each do |candidate|
  next unless File.file?(candidate)
  next if candidate.include?("/.git/")
  next unless text_extensions.include?(File.extname(candidate)) || File.basename(candidate).start_with?(".env.example")

  contents = File.read(candidate)
  secret_patterns.each do |label, pattern|
    error("possible #{label} in #{Pathname.new(candidate).relative_path_from(ROOT)}") if contents.match?(pattern)
  end
end

if ERRORS.empty?
  puts "Portfolio validation passed: #{products.length} products, #{hostnames.length} hostnames, #{manifest.fetch('documents', []).length} source documents."
  exit 0
end

warn "Portfolio validation failed with #{ERRORS.length} error(s):"
ERRORS.each { |message| warn "- #{message}" }
exit 1
