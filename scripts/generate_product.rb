#!/usr/bin/env ruby

require "fileutils"
require "pathname"

ROOT = Pathname.new(__dir__).parent.realpath
TEMPLATE = ROOT.join("templates/product-starter")

slug, display_name, hostname = ARGV
abort "usage: ruby scripts/generate_product.rb <slug> <display-name> <hostname> [destination]" unless slug && display_name && hostname
abort "slug must use lowercase letters, numbers and hyphens" unless slug.match?(/\A[a-z][a-z0-9-]*\z/)
abort "hostname must be a first-level digitalghana.dev subdomain" unless hostname.match?(/\A[a-z0-9-]+\.digitalghana\.dev\z/)

destination = Pathname.new(ARGV[3] || ROOT.join("tmp", slug).to_s).expand_path
abort "destination already exists: #{destination}" if destination.exist?

tokens = {
  "__PRODUCT_SLUG__" => slug,
  "__PRODUCT_NAME__" => display_name,
  "__PRODUCT_HOSTNAME__" => hostname
}

TEMPLATE.find do |source|
  next if source == TEMPLATE
  relative = source.relative_path_from(TEMPLATE).to_s
  target = destination.join(relative.gsub("dot-github", ".github"))
  if source.directory?
    FileUtils.mkdir_p(target)
  else
    FileUtils.mkdir_p(target.dirname)
    content = source.binread
    tokens.each { |from, to| content = content.gsub(from, to) }
    target.binwrite(content)
    FileUtils.chmod(0o755, target) if target.basename.to_s.end_with?(".rb")
  end
end

puts "Generated #{display_name} at #{destination}"
