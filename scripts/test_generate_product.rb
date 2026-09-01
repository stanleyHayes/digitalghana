#!/usr/bin/env ruby

require "open3"
require "tmpdir"

Dir.mktmpdir("digitalghana-starter-") do |directory|
  destination = File.join(directory, "sample-product")
  command = ["ruby", File.expand_path("generate_product.rb", __dir__), "sample-product", "Sample Product", "sample.digitalghana.dev", destination]
  stdout, stderr, status = Open3.capture3(*command)
  abort stdout + stderr unless status.success?

  required = %w[README.md AGENTS.md agent_plan.md SECURITY.md LICENSE .github/workflows/quality.yml contracts/README.md docs/adr/0001-product-boundary.md docs/governance/source-register.json docs/runbooks/operations.md docs/runbooks/release-evidence.md infra/vercel.json]
  missing = required.reject { |path| File.exist?(File.join(destination, path)) }
  abort "missing generated files: #{missing.join(', ')}" unless missing.empty?

  generated = Dir.glob(File.join(destination, "**", "*"), File::FNM_DOTMATCH).select { |path| File.file?(path) }.map { |path| File.binread(path) }.join("\n")
  abort "starter token remained" if generated.include?("__PRODUCT_")
  abort "GeoGhana-specific content leaked into starter" if generated.match?(/ghanageo|GhanaGeo/i)
  abort "possible secret leaked into starter" if generated.match?(/-----BEGIN .*PRIVATE KEY-----|gh[opsu]_[A-Za-z0-9]{36,}/)

  puts "PASS product starter clean generation"
end
