require 'fileutils'

def source_paths
  [File.expand_path(File.dirname(__FILE__))]
end

p 'Overwrite files when conflictions happen'

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

if File.exists?(".gitignore")
  append_to_file '.gitignore' do
    '/public/bundles'
  end
end

copy_file '.rspec'
copy_file '.stylelintrc.json'
copy_file '.babelrc.js'
copy_file '.eslintignore'
copy_file '.eslintrc.json'
copy_file '.browserslistrc'
copy_file 'jest.config.js'
copy_file 'tsconfig.json'

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
copy_file 'spec/javascripts/components/HelloMedbear.spec.ts'
copy_file 'spec/javascripts/components/__snapshots__/HelloMedbear.spec.ts.snap'
copy_file 'spec/javascripts/tsconfig.json'
copy_file 'webpack.common.js'
copy_file 'webpack.dev.js'
copy_file 'webpack.prod.js'

# gem install
gem_group :development do
  gem 'rack-proxy'
end

gem_group :test do
  gem 'capybara'
  gem 'selenium-webdriver'
  gem 'webdrivers'
  gem 'rspec-rails'
  gem 'factory_bot_rails'
end

run 'bundle install --path vendor/bundle --jobs=4'
run 'yarn install'
run 'yarn run dev'

p '---------------Confirm---------------'
p '1) Confirm and fix files when conflictions happen.'
p '2) Confirm unused gems due to webpack usage ex) sass-rails, uglifier, coffee-rails, thrbolinks, jquery-rails'
p '3) Confirm rspec settings and directory structure whether it keeps working.'
p '-------------------------------------'
