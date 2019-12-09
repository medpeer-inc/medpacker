Japanese [README.md](https://github.com/medpeer-inc/README.ja.md)

# Index
- [About](https://github.com/medpeer-inc/medpacker#About)
- [How to apply](https://github.com/medpeer-inc/medpacker#How to apply)
- [webpack-dev-server setting under ssl(https)](https://github.com/medpeer-inc/medpacker#webpack-dev-server setting under ssl(https))
- [How to use](https://github.com/medpeer-inc/medpacker#How to use)
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

#### エントリーポイントのts
各ページ毎に読み込むtsは`app/bundles/javascripts/entries`下に設置して、`javascript_bundle_tag`で読み込んでください。
例えば、`app/bundles/javascripts/entries/home/index.ts`は以下のようにして読み込むことができます。
```
# app/views/home/index.html.erb

<% content_for :bundle_js do %>
  <%= javascript_bundle_tag 'home/index' %>
<% end %>

<div class="container">
  ...何かしらのhtml
</div>
```
ここで注意して欲しいのが、必ず`content_for :bundel_js`を使用してほしい点です。
これによるアセットの設定先はheadタグの最後になります。
もしこれを用いない場合、上手くtsが動作しない・画面の描画が遅くなると言った不具合が生じます。

### cssの読み込み
#### ディレクトリ構成
```
app/
  └ bundles/
    └ stylesheets/
      valiables.scss # 変数を置く
      ├ entries/     # エントリーポイントで読み込むscssを置く場所
        └ ...
      ├ components/  # scssのコンポーネントを置く
        └ ...
      └ mixin/       # scssのミックスインを置く
        └ ...
```

プロジェクト毎に適宜ディレクトリ切ってください。

#### application.scss
[application.scss](https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/stylesheets/entries/application.scss)は全ページ共通で使用するcssを書く場所です。デフォルトで読み込んであります。


#### エントリーポイントのcss
各ページ毎に読み込むcssは`app/bundles/stylesheets/entries`下に配置して、tsのエントリーポイントにてimportしてください。
さらに`stylesheet_bundle_tag`で読み込んでください。
例えば`app/bundles/stylesheets/entries/home/index.scss`というファイルは以下のように読み込むことができます。
```
# app/bundles/javascripts/entries/home/index.ts
import '@style/entries/entries/home/index.scss'

# app/views/home/index.html.erb
<% content_for :bundle_css do %>
  <%= stylesheet_bundle_tag 'home/index' %>
<% end %>

<div class="container">
  ...何かしらのhtml
</div>
```
tsと同様に、必ず`content_for :bundel_css`を使用してください。
これによるアセットの設定先はheadタグになります。
繰り返しますが、必ず<b>tsのエントリーポイントにてscssのファイルをimportしてください。</b>
そうしないとwebpackがscssをビルドしてくれず、`stylesheet_bundle_tag`の実行時にcssが読み込まれずエラーが起きます。

### 画像の読み込み
もしimageタグで画像を読み込みたい場合は、以下のようにする必要があります(cssのbackground-imageで読み込む場合は以下を実施する必要はありません)。

#### tsファイルに画像ファイルをimport
`app/bundles/javascripts/entries/image.ts`に読み込みたい画像をimportしてください。
例えば以下のように
```
# app/bundles/javascripts/entries/image.ts
import './webpack-logo.svg';
```

#### image_bundle_tagを使って、erbファイルに画像を埋め込む
[こんな感じで](https://github.com/medpeer-inc/medpacker/blob/master/app/views/home/index.html.erb#L19)、image_bundle_tagを使うことで指定した画像ファイルのimgタグを出力することができます。

### E2Eテスト(というかfeature spec & system spec)
デフォルトでは、実行対象のrspec内に`js: true`があれば一度だけwebpackのビルドが走り、それでビルドされたアセットを使用してtsを使用したfeature spec/system specが実行されるようになっています。

もしrspec実行時にwebpackのビルドを走らせたくなかったら、`SKIP_WEBPACK_BUILD`という環境変数に`true`を渡してあげるとビルドがスキップされるので必要に応じて使ってください。テストを並列で実行させたい時などは事前にwebpackでビルドしておいて、`SKIP_WEBPACK_BUILD=true`でrspec実行時ではビルドしないようにさせた方が効率がいいと思います。

```
$ SKIP_WEBPACK_BUILD=true bundle exec rspec
```

### ユニットテスト
Railsに依存しないフロントエンドのユニットテスト環境をjestで用意しています。
`spec/javascripts/`配下に置かれたtsファイル（`**/*.spec.ts`）をテストとして認識します。

#### 何をテストするべきか
テスト方針はプロジェクト状況次第ですが、以下のようなテスト方針がおすすめです。

`.vue`ファイルは最低限`mount`が成功するかどうかをテスト。`computed`や`methods`も怪しい分岐や凝った処理は可能な限りテスト。
ビジネスロジックはコンポーネント（`.vue`）に書かず、`.ts`ファイルに切り出せないかを検討する。そして`.ts`ファイルは`export`している関数を可能な限り網羅。

テストの書きやすさは、`.vue`ファイルの`<template>`部分 < `.vue`ファイルの部分`<script>` < `.ts`ファイルという並び。複雑な処理ほどテストしやすい場所に書いておく。
`<template>`はシンプルに保ってテストを頑張りすぎない。

#### 良くある失敗例
* シンプルな分岐なのでテスト省略
* 機能追加で分岐増える
* 既存テストがないから踏襲してテストなし
* 機能追加で分岐（ry
* 機能追（ry*
* 手を付けてはいけないコードの完成

# Contents
このレポジトリに導入されている主要なライブラリや機能を紹介します。

## webpack/webpack-dev-server
このレポジトリのキモです。フロントエンドのアセットをビルドするために使っています。

### webpack
ts, css, 画像ファイルをビルドします。ビルドしたファイルは`public/bundles`以下に出力します。
webpackでビルドしたファイルは、[このヘルパー](https://github.com/medpeer-inc/medpacker/blob/master/app/helpers/webpack_bundle_helper.rb)で定義されているメソッドで読み込むことができます。

ビルドには、developmentモードによるビルドとproductionモードによるビルドの2種類があります。

#### developmentモード
その名の通り、開発時に使用するモードです。
```
$ yarn run dev
$ yarn run dev:watch
$ yarn run dev:server
```
上記3つのコマンドはdevelopmentモードになります。
本モードの特徴としては、ビルドされたアセットが圧縮されない・ソースマップが出力されるなど、開発時のデバッグがやりやすいようになっています。

#### productionモード
その名の通り、本番環境で使用するアセットをビルドするためのモードになります。
```
$ yarn run build
```
上記のコマンドはproductionモードになります。
本モードの特徴は、出力されるファイルの大きさを極力小さくするということです。
developtmentモードと違い、ビルドされたアセットが圧縮される・ソースマップが出力されないなど、デバッグはやりにくいですが、ファイルが小さいためより高速にクライアントがアセット取得できます。

#### webpack-dev-server
また、通常のwebpackの他にwebpack-dev-serverを導入しています。
これはwebpackの開発をサポートするツールです。
例えば...
- TSを変更した時差分のビルドをしてくれる(webpackのwatchと同じ)
- リロードせずに更新したファイルがブラウザに適用される(Hot module replacement, HMR)
- 上記のHMRができない場合は自動的にブラウザをリロードし、更新分のアセットを取得する

という機能が使えます。是非使ってみてください。

ただwebpack-dev-serverですがdocker上で動かす場合、dockerの設定とwebpack-dev-serverの設定(hostやportあたり)を調整する必要がある場合があります。
webpack-dev-server側は以下のファイルを修正する必要があるかもしれません。
```
https://github.com/medpeer-inc/medpacker/blob/master/webpack.dev.js#L8
https://github.com/medpeer-inc/medpacker/blob/master/config/dev_server_proxy.rb
https://github.com/medpeer-inc/medpacker/blob/master/config/environments/development.rb#L64
```

## babel系
jsを色々なブラウザで読み込めるように(例えば最新の記法が古いブラウザでも読み込めるように)変形/代替してくれるライブラリになります。
すでに設定済みなので、IE11とか気にせずにjsを書いても問題ありません。

このレポジトリのbabel変換における対象ブラウザ設定では、medpeer.jpの推奨環境より多少緩く設定しています。
https://github.com/medpeer-inc/medpacker/blob/master/webpack.common.js#L30

もし自分で設定したいよという場合は以下2つのサイトを参考に設定してみてください(やり方がよくわからないという場合はお近くのフロントエンドエンジニアまで)。
- https://github.com/browserslist/browserslist
- https://browserl.ist

## lint系
tsとcssのlintを設定しています。

### eslint
`app/bundles/javascripts`配下のts及び単一ファイルコンポーネントファイル(.vue)をlint対象にしています。
`yarn run eslint`で実行できます。もし自動修正してほしい場合は`yarn run eslint:fix`を実行してください。

### prettier
prettierによってフロントエンドアセットを自動整形しています。
eslintプラグインとして動作します。

### stylelint
`app/bundles/stylesheets`及び`app/bundles/javascripts/components`配下のscss(Vue.jsの単一ファイルコンポーネント内部のscssを含む)をlint対象にしています。
`yarn run eslint`で実行できます。もし自動修正してほしい場合は`yarn run eslint:fix`を実行してください。

## postcss
postcssとはcssに対して何かしらの処理を付与するためのツールです。
現状では以下2つのpostcssのツール(プラグイン)を入れています。
デザイナーとマークアップエンジニアが幸せになる系のプラグインを入れてあります。

### autoprefixer
自動的にベンダープレフィックスを付与してくれる。

### postcss-flexbugs-fixes
IE11のflexboxのバグを考慮したcssを出力してくれるツール。
なので、cssでflexboxを書く時はIE11のバグを気にせず書いても大丈夫です。

## TypeScript
デフォルトでの導入迷っていましたが、社内でsorbetが導入され始めたのをみて便乗して入れました。
型は強めに設定してます。緩めて欲しかったら社内のフロントエンドエンジニアに相談してください。

## Vue.js
デフォルトで入れておきました。
Vue.js以外を入れたい場合(jQuery, React, Angular等)はお近くのフロントエンドエンジニアまで相談してください。
そもそも「フレームワークいらねーよ」という方はVue.js周りの設定を剥ぎ取った上で、`package.json`からvueを削除してください(やり方がわからなかったらお近くのフロントエンドエンジニアまで)。

## axios
ajaxしたい時はaxiosを使ってください。くれぐれも`$.ajax`を使いたいという理由だけでjQueryを入れるのはやめましょう。

## jest
フロントエンド用のテストフレームワークです。
webpackとは独立した設定環境を持っているため、設定周りで詰まったときはお近くのフロントエンドエンジニアまでお願いします。

# Q&A
## jQueryは入れないの?
最近のjsはjQueryがなくても便利にDOM操作できるようになってきているので入れていないです。
どうしても入れたい場合はお近くのフロントエンドエンジニアまで相談してください。

## assets pipeline使わないの?
assets pipelineの特性上、全てのjs, cssをそれぞれ1ファイルにまとめます。
プロジェクトが大きくなると一つにまとめたjs, cssのサイズが膨大になりキャッシュが効いていない状態ではダウンロードに時間がかかってしまいます。
またjs, cssのビルドもgemと密結合するので、小回りの効いた設定がやりづらいといった問題もあります。

そのためassets pipelineは外してあります。

## webpackerはどうよ?
いつまでたってもwebpack3系依存が抜けない(つまりwebpackのバージョンアップにwebpackerがついていけていない)のでwebpackerは諦めました(やっと[4系出そう](https://github.com/rails/webpacker/releases)ですね)。
webpackが昔のバージョンのままだと、依存関係がめんどくさくなるのでもうwebpacker捨てちまおうという判断です。

## remote: trueでajaxが動かないんだけど...
以下をコメントアウトしてください。
<br />
https://github.com/medpeer-inc/medpacker/blob/master/app/bundles/javascripts/entries/application.ts#L3

# Caution
- npmコマンドでパッケージを追加しないでください。yarnでやってください。

# LICENSE
This software is released under the MIT License, see the license file.

