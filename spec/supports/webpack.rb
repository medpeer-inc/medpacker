RSpec.configure do |config|
  $_run_webpack = ENV['SKIP_WEBPACK_BUILD'] === 'true'

  config.before(:context, js: :true) do
    unless $_run_webpack
      system('yarn run dev')
      $_run_webpack = true
    end
  end
 end
 