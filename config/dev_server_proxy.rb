require 'rack/proxy'

# proxy getting asset from webpack-dev-server for other hosts except for localhost
class DevServerProxy < Rack::Proxy

  def perform_request(env)
    if env['PATH_INFO'].start_with?('/bundles/')
      env['HTTP_HOST'] = dev_server_host
      env['HTTP_X_FORWARDED_HOST'] = dev_server_host
      env['HTTP_X_FORWARDED_SERVER'] = dev_server_host
      super
    else
      @app.call(env)
    end
  end

  private

  def dev_server_host
    Rails.application.config.dev_server_host
  end
end