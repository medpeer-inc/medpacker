require 'rack/proxy'

class DevServerProxy < Rack::Proxy
  PROTOCOL = 'http'

  def perform_request(env)
    if env['PATH_INFO'].start_with?('/bundles/')
      env['HTTP_HOST'] = env['HTTP_X_FORWARDED_HOST'] = env['HTTP_X_FORWARDED_SERVER'] = dev_server_host
      env['HTTPS'] = env['HTTP_X_FORWARDED_SSL'] = 'off'
      env['HTTP_X_FORWARDED_PROTO'] = env['HTTP_X_FORWARDED_SCHEME'] = PROTOCOL
      super(env)
    else
      @app.call(env)
    end
  end

  private

  def dev_server_host
    Rails.application.config.dev_server_host
  end
end
