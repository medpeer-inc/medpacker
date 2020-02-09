Japanese [README.md](https://github.com/medpeer-inc/medpacker/README.ja.md)

# Index
- [About](https://github.com/medpeer-inc/medpacker#About)
- [How to apply](https://github.com/medpeer-inc/medpacker#how-to-apply)
- [webpack-dev-server setting under ssl(https)](https://github.com/medpeer-inc/medpacker#webpack-dev-server-setting-under-sslhttps)
- [How to use](https://github.com/medpeer-inc/medpacker#how-to-use)
- [Contents](https://github.com/medpeer-inc/medpacker#Contents)
- [Q&A](https://github.com/medpeer-inc/medpacker#qa)
- [Caution](https://github.com/medpeer-inc/medpacker#Caution)

# About
This is the template repo combined Ruby on Rails with webpack without webpacker.
This includes libraries which will be needed by MedPeer projects.
Read below sections before you introduce your project.

# How to apply
There are 3 ways to introduce your project.

## 1: Using application template
**Recommended way**

First, clone this repo.
```
$ mkdir tmp
$ cd tmp
$ git clone https://github.com/medpeer-inc/medpacker.git
```

Next, move your project directory and exec below command.
```
$ cd path/to/target-repo
$ bin/rails app:template LOCATION=path/to/tmp/medpacker/template.rb
```

Follow the instructions of cli.

## 2: Clone this repo
Simple way but you have to be just before rails new.
Clone and push to your remote repo changing initial remote setting.

## 3: Imigrate manually
Imigrate [this codes](https://github.com/medpeer-inc/medpacker/compare/fd72d963b1b700031104c78956a61877afb6269f...master) manually.
I guess you finish within 30 minites.

# webpack-dev-server setting under ssl(https)
Almost all MedPeer projects use self-signed certifications for development environment.
In this case, webpack-dev-server doesn't work so you have to deal with it.

## Setting webpack-dev-server public option
Set dev environment domain to below option.
<br />
ex) set `foo.test` when environment domain is `foo.test`

https://github.com/medpeer-inc/medpacker/blob/master/webpack.dev.js#L9

## Proxy https request throngh nginx
```
server {
  listen 443 ssl;

~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     nginx setting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  location /sockjs-node {
    proxy_redirect off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_pass http://host_name:3035;
  }
}
```

After you finish above steps, confirm whether webpack-dev-server works or not.
If that doesn't work, ask MedPeer frontend engineers.

# How to use
## Overall
Below codes help you understand how to implement and build.
```
https://github.com/medpeer-inc/medpacker/blob/master/app/views/layouts/application.html.erb
https://github.com/medpeer-inc/medpacker/blob/master/app/views/home/index.html.erb
https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/javascripts/entries/application.ts
https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/javascripts/entries/home/index.ts
https://github.com/medpeer-inc/medpacker/blob/master/package.json
```

## Detail
### npm scripts
```
$ yarn run dev            # build assets by webpack as dev mode
$ yarn run dev:watch      # build assets by webpack as dev mode(watch build)
$ yarn run dev:server     # start webpack-dev-server
$ yarn run build          # build assets by webpack as production mode
$ yarn run eslint         # eslint
$ yarn run eslint:fix     # eslint with auto fix
$ yarn run stylelint      # lint css
$ yarn run stylelint:fix  # lint css with auto fix
$ yarn run test           # unit test by jest
```

### TypeScript(Javascript)
#### Directory structure
```
app/
  └ bundles/
    └ javascripts/
      ├ entries/     # Put entry point files.
        └ ...
      ├ modules/     # Put ts(js) modules.
        └ ...
      ├ components/  # Put Vue.js components. Delete this dir when you don't use Vue.js.
        └ ...
      ├ plugins/     # Put Vue.js plugins. Delete this dir when you don't use Vue.js.
        └ ...
      ├ directives/  # Put Vue.js custom directives. Delete this dir when you don't use Vue.js.
        └ ...
      └ store/       # Put vuex stores. Delete this dir when you don't use vuex.
        └ ...
      └ types/       # Put TypeScript type definition files.
        └ ...
```

#### application.ts
[application.ts](https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/javascripts/entries/application.ts) is the file which you should write common scripts across all pages.

#### entry points
Use `javascript_bundle_tag` to read entry point TypeScript(JavaScript) file which should be put under `app/bundles/javascripts/entries` to each page.
For instance, you can apply `app/bundles/javascripts/entries/home/index.ts` like this...
```
# app/views/home/index.html.erb

<% content_for :bundle_js do %>
  <%= javascript_bundle_tag 'home/index' %>
<% end %>

<div class="container">
  ...
</div>
```
Don't forget to use `content_for :bundel_js`.
This makes entry point TS(JS) putting inside head tag.
If you don't use this, your JS would't work or get delay to render page.

### CSS(SCSS)
#### Directory structure
```
app/
  └ bundles/
    └ stylesheets/
      valiables.scss # Put SCSS variables
      ├ entries/     # Put SCSS to read each page(including application.scss).
        └ ...
      ├ components/  # Put SCSS components
        └ ...
      └ mixin/       # Put SCSS mixins
        └ ...
```
Make new directories if needed.

#### application.scss
[application.scss](https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/stylesheets/entries/application.scss) is the file which you should write common SCSS across all pages.

#### entry points
Put SCSS files to import each pages under `app/bundles/stylesheets/entries` and import themselfs to TS entry point.
Finaly, use `stylesheet_bundle_tag` to apply your SCSS file.
For instance, you can apply `app/bundles/stylesheets/entries/home/index.scss` like this...
```
# app/bundles/javascripts/entries/home/index.ts
import '@style/entries/entries/home/index.scss'

# app/views/home/index.html.erb
<% content_for :bundle_css do %>
  <%= stylesheet_bundle_tag 'home/index' %>
<% end %>

<div class="container">
  ...
</div>
```
Use `content_for :bundel_css` same as TS import.
This makes the stylesheet putting inside head tag.
<b>import SCSS file to TS entry point once again.</b>
Otherwise, webpack doesn't build SCSS file and occur the error when `stylesheet_bundle_tag` evaluate.

### Image
Follow the below instruction when you import images to your application(you don't need them when you use images for css background-image).

#### Use image_bundle_tag inside erb file
You can render image tag [like this](https://github.com/medpeer-inc/medpacker/blob/master/app/views/home/index.html.erb#L19) using `image_bundle_tag`.

#### resolve image path
##### css
`url('~@image/medbear.png')`

##### ts
`import img from '@image/medbear.png';`
The img variable is string literal of image path.

##### Vue.js template
```
<template>
    <img :src="require('@image/medbear.png').default" alt="Hello Medbear" />
  </div>
</template>
```

### E2E test (feature spec & system spec)
Medpacker executes webpack build as default when it inspects `js: true` before driving e2e specs.
You can skip it by setting `SKIP_WEBPACK_BUILD=true` when you don't want to execute webpack build before e2e.
You should build asset by webpack in advance when you excute e2e test in parallel.

```
$ SKIP_WEBPACK_BUILD=true bundle exec rspec
```

### Unit test
Medpacker prepares unit test enviroment by jest(this doesn't depends on Ruby on Rails).
Jest recognizes TS files like `**/*.spec.ts` as test files which are put under `spec/javascripts/` dir.

#### What should you test?
Test policy depends on each project but we recommend below policy.

- Test mounting for Vue.js component at least.
- Test coplicated methods and computed as much as you can.
- Think about separating business logics from components to pure functions and test their functions.

We show that how easy you write tests each section.

SFC `<template>` < SFC `<script>` < pure TS(JS)

Put logics on more testable place and keep simple

#### Common story you often encounter without testing
1. Skip writing test because of simple condition.
1. New feature added and it makes the condition more coplicated.
1. You don't write test due to no test there.
1. New feature added and it makes the condition more coplicated.
1. New feature added and it makes the condition more coplicated.
1. You finaly found out chaos codes...

# Contents
Instroduction of important libraries which this repo has.

## webpack/webpack-dev-server
Fundamentals of this repo. webpack and webpack-dev are used by assets build.

### webpack
webpack build TS(JS), SCSS(css), images and output files to `public/bundles`.
Your application can read them by using [this helper methods](https://github.com/medpeer-inc/medpacker/blob/master/app/helpers/webpack_bundle_helper.rb).

There are 2 modes for build.

#### development mode
This mode is for development environment.
```
$ yarn run dev
$ yarn run dev:watch
$ yarn run dev:server
```
Above 3 commands are executed as development mode.
This mode makes you easy to development and debug.
ex) not minify assets, output sourcemap.

#### production mode
This mode is for production environment.
```
$ yarn run build
```
Above command are executed as production mode.
This mode makes assets minify as small as possible.
This mode make you difficult to debug but browsers can get assets faster.

#### webpack-dev-server
We have introduced webpack-dev-server.
This helps you local environment development.
For example...
- Build incrementally when you change TS or SCSS (same with webpack watch build)
- Apply updated files to the browser without browser reload (it is called Hot module replacement, HMR)
- Auto browser reload in case of not working HMR

You can get these features by using webpack-dev-server.

However, you have to adjust webpack-dev-server settings like host and port when you work that on docker.
Look at these files and adjust settings.
```
https://github.com/medpeer-inc/medpacker/blob/master/webpack.dev.js#L8
https://github.com/medpeer-inc/medpacker/blob/master/config/dev_server_proxy.rb
https://github.com/medpeer-inc/medpacker/blob/master/config/environments/development.rb#L64
```

## babel ecosystem
Babel transforms your JavaScript codes to be able to work at designated browswer versions.
We have already prepared this ecosystem so you don't have to mind IE11!.

Target browsers setting is here. We set widely more than medpeer.jp recommended browser versions.
https://github.com/medpeer-inc/medpacker/blob/master/.browserslistrc

When you set by yourself, refer to below sites.
- https://github.com/browserslist/browserslist
- https://browserl.ist

## linters
We have already set TS and SCSS linters.

### eslint
Default lint targets are TS files and SFC files under `app/bundles/javascripts`.
You can exec eslint by `yarn run eslint`.
And you can use auto fix by executing `yarn run eslint:fix`.

### prettier
Prettier is the code fomatter for frontend assets.
This works as eslint plugin.

### stylelint
Default lint targets are SCSS files and SFC files under `app/bundles/stylesheets` and `app/bundles/javascripts/components`.
You can exec stylelint by `yarn run stylelint`.
And you can use auto fix by executing `yarn run stlyelint:fix`.

## postcss
postcss is the tool to transform CSS and add something awesome.
We have set 2 postcss plugins as default and they make frontend engineer happier.

### autoprefixer
Add vendor prefix automatically.

### postcss-flexbugs-fixes
The tool for outputing fixed flexbox bugs codes.

## TypeScript
Default settings are strict.
Ask your frontend engineers if you want to relieve strict settings.

## Vue.js
Installed as default.
Ask your frontend engineers if you want to use other JS frontend frameworks like jQuery, React, Angular etc.. .
If you don't use Vue.js, remove that and that's ecosystem.

## axios
Use axios. Just axios. Don't use `$.ajax`.

## jest
Testing frame work for JavaScript.
This config is apart from webpack so ask your frontend engineers when you get stuck settings.

# Q&A
## Why not JQuery?
I haven't installed JQuery due to DOM handling of pure JS enough good.
Ask your frontend engineers when you think you have to install it.

## Why not assets pipeline?
assets pipeline outputs a file all JS and CSS.
The code base of the project bigger, the output file bigger and it takes much time to download without cache.
Additionaly, assets pipeline uses gem and it makes frontend settings ruined.

## How about webpacker?
webpacker abstracts webpack config which has good points and bad points.
Developers who focus on Rails get advantages from that due to easy setting.
However, Frontend engineers sometimes suffer from that abstraction which makes them annoying to set webpack advanced settings.
So we decided not to install webpacker to handle pure webpack.

## ajax does't work by using remote: true
comment out below.
<br />
https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/javascripts/entries/application.ts#L3

# Caution
- Don't use npm. Just use yarn.

# LICENSE
This software is released under the MIT License, see the license file.

