RSpec.configure do |config|
  run_webpack = ENV['SKIP_WEBPACK_BUILD'] == 'true'

  config.before(:context, js: :true) do
    unless run_webpack
      system('yarn run dev')
      run_webpack = true
    end
  end
 end
