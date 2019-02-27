require 'fileutils'

def source_paths
  [File.expand_path(File.dirname(__FILE__))]
end

p 'コンフリクトした場合はオーバーライトしてください。'

if yes? "remove 'app/assets'?"
  run 'rm -rf app/assets'
end

if yes? "remove 'test/'?"
  run 'rm -rf test/'
end

if yes? 'need example page?'
  copy_file 'app/views/home/index.html.erb'
  copy_file 'app/controllers/home_controller.rb'
  copy_file 'config/routes.rb'
  copy_file 'spec/features/home_spec.rb'
end

copy_file '.eslintrc.json'
copy_file '.gitignore'
copy_file '.rspec'
copy_file '.stylelintrc.json'

FileUtils.cp_r("#{File.expand_path(File.dirname(__FILE__))}/app/bundles", 'app/bundles')

copy_file 'app/helpers/webpack_bundle_helper.rb'
copy_file 'app/views/layouts/application.html.erb'
copy_file 'config/dev_server_proxy.rb'
copy_file 'config/environments/development.rb'
copy_file 'package.json'
copy_file 'spec/helpers/webpack_bundle_helper_spec.rb'
copy_file 'spec/rails_helper.rb'
copy_file 'spec/spec_helper.rb'
copy_file 'spec/supports/capybara.rb'
copy_file 'spec/supports/webpack.rb'
copy_file 'webpack.common.js'
copy_file 'webpack.dev.js'
copy_file 'webpack.prod.js'

# gem install
gem_group :development do
  gem 'rack-proxy'
end

gem_group :test do
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end

run 'bundle install --path vendor/bundle --jobs=4'
run 'yarn install'
run 'yarn run dev'

p '----------以下確認してください----------'
p '1) コンフリクトしたファイルが出た場合は確認・修正を行ってください。'
p '2) webpackの使用で不要になるgemがないか確認してください。ex) sass-rails, uglifier, coffee-rails, thrbolinks, jquery-rails'
p '3) rspec周りの設定やディレクトリ構成が正しいか確認してください。'
p '-------------------------------------'
