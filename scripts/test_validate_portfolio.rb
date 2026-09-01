#!/usr/bin/env ruby

require "fileutils"
require "json"
require "open3"
require "pathname"
require "tmpdir"

ROOT = Pathname.new(__dir__).parent.realpath
VALIDATOR = ROOT.join("scripts/validate_portfolio.rb")

REQUIRED_PATHS = %w[
  README.md
  AGENTS.md
  CONTRIBUTING.md
  SECURITY.md
  CODE_OF_CONDUCT.md
  agent_plan.md
  Ghana_Digital_Public_Infrastructure_Project_Portfolio.docx
  AI_Development_Workflow_Training_Manual.docx
  AI_Native_Software_Engineering_Operations_Manual.docx
  docs/adr/0001-federated-portfolio-architecture.md
  docs/governance/data-source-policy.md
  docs/governance/licensing-policy.md
  docs/standards/domain-and-dns.md
  docs/standards/product-lifecycle.md
  docs/runbooks/evidence/dns-inventory-2026-09-01.md
  docs/runbooks/evidence/provider-inventory-2026-09-01.md
  docs/portfolio/source-manifest.json
  portfolio/products.json
  portfolio/products.schema.json
  portfolio/source-manifest.schema.json
  scripts/validate_portfolio.rb
].freeze

def copy_fixture(destination)
  REQUIRED_PATHS.each do |relative_path|
    source = ROOT.join(relative_path)
    target = Pathname.new(destination).join(relative_path)
    FileUtils.mkdir_p(target.dirname)
    FileUtils.cp(source, target)
  end
end

def update_json(path)
  data = JSON.parse(File.read(path))
  yield data
  File.write(path, JSON.pretty_generate(data) + "\n")
end

def run_validator(root)
  Open3.capture3("ruby", Pathname.new(root).join("scripts/validate_portfolio.rb").to_s)
end

def assert_case(name, expected_success:, expected_text: nil)
  Dir.mktmpdir("digitalghana-validator-") do |directory|
    copy_fixture(directory)
    yield Pathname.new(directory) if block_given?
    stdout, stderr, status = run_validator(directory)
    output = stdout + stderr

    if status.success? != expected_success
      abort("#{name}: expected success=#{expected_success}, got #{status.exitstatus}\n#{output}")
    end
    if expected_text && !output.include?(expected_text)
      abort("#{name}: expected output to include #{expected_text.inspect}\n#{output}")
    end
    puts "PASS #{name}"
  end
end

assert_case("valid portfolio", expected_success: true, expected_text: "Portfolio validation passed")

assert_case("duplicate hostname", expected_success: false, expected_text: "duplicate hostname ownership") do |root|
  path = root.join("portfolio/products.json")
  update_json(path) do |catalogue|
    catalogue["products"][2]["surfaces"][0]["hostname"] = "geo.digitalghana.dev"
  end
end

assert_case("unsupported live claim", expected_success: false, expected_text: "live hostname lacks provider") do |root|
  path = root.join("portfolio/products.json")
  update_json(path) do |catalogue|
    catalogue["products"][0]["surfaces"][0]["state"] = "live"
  end
end

assert_case("premature gateway", expected_success: false, expected_text: "gateway cannot be live") do |root|
  path = root.join("portfolio/products.json")
  update_json(path) do |catalogue|
    gateway = catalogue["products"].find { |product| product["id"] == "data" }
    gateway_surface = gateway["surfaces"].find { |surface| surface["kind"] == "gateway" }
    gateway_surface["state"] = "live"
    gateway_surface["provider"] = "test-provider"
    gateway_surface["evidence"] = "test-evidence"
  end
end

assert_case("changed source document", expected_success: false, expected_text: "source checksum changed") do |root|
  File.open(root.join("Ghana_Digital_Public_Infrastructure_Project_Portfolio.docx"), "ab") { |file| file.write("changed") }
end
