require 'open-uri'

module WebpackBundleHelper
  class BundleNotFound < StandardError; end

  def asset_bundle_path(entry, **options)
    raise BundleNotFound, "Could not find bundle with name #{entry}" unless manifest.key? entry
    asset_path(manifest.fetch(entry), **options)
  end

  def javascript_bundle_tag(entry, **options)
    # skip when not generate split chunk
    return if entry == 'vendor' && !manifest.key?("#{entry}.js")
  
    path = asset_bundle_path("#{entry}.js")

    options = {
      src: path,
      defer: true
    }.merge(options)

    if options[:async]
      options.delete(:defer)
    end

    javascript_include_tag '', **options
  end

  def stylesheet_bundle_tag(entry, **options)
    path = asset_bundle_path("#{entry}.css")

    options = {
      href: path
    }.merge(options)

    stylesheet_link_tag '', **options
  end

  def image_bundle_tag(entry, **options)
    raise ArgumentError, "Extname is missing with #{entry}" unless File.extname(entry).present?
    image_tag asset_bundle_path(entry), **options
  end

  private

  MANIFEST_PATH = 'public/bundles/manifest.json'.freeze

  def manifest
    return @manifest ||= JSON.parse(dev_manifest) if Rails.env.development?
    return @manifest ||= JSON.parse(test_manifest) if Rails.env.test?
    return @manifest ||= JSON.parse(prod_manifest)
  end

  def prod_manifest
    File.read(MANIFEST_PATH)
  end

  def dev_manifest
    if exist_dev_server_process?
      OpenURI.open_uri("#{dev_server_host}/bundles/manifest.json", ssl_verify_mode: OpenSSL::SSL::VERIFY_NONE).read
    else
      File.read(MANIFEST_PATH)
    end
  end

  def test_manifest
    File.read(MANIFEST_PATH)
  end

  def dev_server_host
    "http://#{Rails.application.config.dev_server_host}"
  end

  def exist_dev_server_process?
    system('ps aux | grep webpack-dev-serve[r]')
  end
end
