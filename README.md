# 目次
- [これは何か?](https://github.com/medpeer-inc/rails-webpack-template#これは何か)
- [どうやって適用すればいいのか?](https://github.com/medpeer-inc/rails-webpack-template#%E3%81%A9%E3%81%86%E3%82%84%E3%81%A3%E3%81%A6%E9%81%A9%E7%94%A8%E3%81%99%E3%82%8C%E3%81%B0%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B)
- [SSL(HTTPS)対応](https://github.com/medpeer-inc/rails-webpack-template#sslhttps%E5%AF%BE%E5%BF%9C)
- [どうやって使えばいいのか?](https://github.com/medpeer-inc/rails-webpack-template#%E3%81%A9%E3%81%86%E3%82%84%E3%81%A3%E3%81%A6%E4%BD%BF%E3%81%88%E3%81%B0%E3%81%84%E3%81%84%E3%81%AE%E3%81%8B)
- [何が入っているのか?](https://github.com/medpeer-inc/rails-webpack-template#%E4%BD%95%E3%81%8C%E5%85%A5%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8B)
- [Q&A](https://github.com/medpeer-inc/rails-webpack-template#qa)
- [注意点](https://github.com/medpeer-inc/rails-webpack-template#%E6%B3%A8%E6%84%8F%E7%82%B9)
- [参考資料](https://github.com/medpeer-inc/rails-webpack-template#%E5%8F%82%E8%80%83%E8%B3%87%E6%96%99)

# これは何か?
Railsとwebpackを統合したテンプレートです(not webpacker)。
メドピアのフロントエンド開発で最低限必要になる(と思われる)ものを入れてあります。
各部署・プロジェクトのrailsレポジトリに適用する場合は以下を参考にしてください。

# どうやって適用すればいいのか?
## 手段1: アプリケーションテンプレートを使用する
推奨方法です。
まずこのレポジトリをローカルにcloneしてください。
```
$ mkdir tmp
$ cd tmp
$ git clone https://github.com/medpeer-inc/rails-webpack-template.git
```

次に適用対象のレポジトリに移動し、アプリケーションテンプレートのコマンドを打ってください。
```
$ cd path/to/target-repo
$ bin/rails app:template LOCATION=path/to/tmp/rails-webpack-template/template.rb
```
あとはCLIの指示に従ってください。

## 手段2: このレポジトリを複製する
楽な方法ですが、まだrails newしていない段階からしか使えません。cloneしてからremoteの向き先変えてpushしてください。
<br /><br />
<b>注) Railsや依存gemのバージョンが古すぎないか確認してください(一応定期的にgemやnpmのバージョンは上げていくつもりです)。</b>

## 手段3: 手動で移植する
[この差分](https://github.com/medpeer-inc/rails-webpack-template/compare/fd72d963b1b700031104c78956a61877afb6269f...master)を人力で移植してください。30分あれば終わると思います。

# SSL(HTTPS)対応
おそらくほとんどのプロジェクトでオレオレ証明書を用いたエセSSL環境下で開発環境を構築すると思います。
その場合、初期状態ではwebpack-dev-serverは動きません。webpack-dev-serverをSSLに対応させる必要があります(大丈夫、簡単です)。

## STEP1: webpack-dev-serverをHTTPSで起動させる
以下ファイルのコメントアウトを解除してください。
<br>
https://github.com/medpeer-inc/rails-webpack-template/blob/cc63424a8a6a65c249d2df9583c50b70903fd9e3/webpack.dev.js#L10

## STEP2: manifest.jsonのURIを変える
以下ファイルのコメントアウトを解除してください。そしてhttpの方を削除してください。
<br>
https://github.com/medpeer-inc/rails-webpack-template/blob/cc63424a8a6a65c249d2df9583c50b70903fd9e3/app/helpers/webpack_bundle_helper.rb#L71

## STEP3: railsのコンテナの3035番ポートを開ける
railsのDockerfileもしくはdocker-compose.ymlで、3035番ポートを開けるように記述してください。
```
# docker-compose.ymlの場合

ports:
  - "3035:3035"

```

ここまでできたらrailsのコンテナを再起動し、webpack-dev-serverが正常に動くか確認してみてください。
正常に動かなかったらお近くのフロントエンドエンジニアに聞いてみてください。

# どうやって使えばいいのか?
## ざっくり編
ざっくりした使い方は以下ファイルを見て貰えるとざっくりわかると思います。
```
https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/views/layouts/application.html.erb
https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/views/home/index.html.erb
https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/bundles/javascripts/entries/application.js
https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/bundles/javascripts/entries/home/index.js
https://github.com/medpeer-inc/rails-webpack-template/blob/master/package.json
```

## 詳細編
### npm scripts
```
$ yarn run dev            # webpackのdevelopmentモードでビルドします
$ yarn run dev:watch      # webpackのdevelopmentモードでビルドします(watchビルド)
$ yarn run dev:server     # webpack-dev-serverを起動します。オートリロードやHMRが効くようになります
$ yarn run build          # webpackのproductionモードでビルドします
$ yarn run eslint         # eslint
$ yarn run eslint:fix     # eslint自動修正モード
$ yarn run stylelint      # cssのlint
$ yarn run stylelint:fix  # cssのlint自動修正モード
```

### jsの読み込み
#### application.js
[application.js](https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/bundles/javascripts/entries/application.js)は全ページ共通で使用するjsを書く場所です。デフォルトで読み込んであります。ga等の計測系やrollbarなどのエラートラッキング系のjsなどを入れてください。注意点として、DOMに纏わる処理をするjsはここには入れないでください、正常に動作しない可能性があります。

#### エントリーポイントのjs
各ページ毎に読み込むjsは`app/bundles/javascripts/entries`下に設置して、`javascript_bundle_tag`で読み込んでください。
例えば、`app/bundles/javascripts/entries/home/index.js`は以下のようにして読み込むことができます。
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
これによるアセットの設定先はbodyタグの最後になります。
もしこれを用いない場合、上手くjsが動作しない・画面の描画が遅くなると言った不具合が生じます。

### cssの読み込み
#### application.scss
[application.scss](https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/bundles/stylesheets/entries/application.scss)は全ページ共通で使用するcssを書く場所です。デフォルトで読み込んであります。

#### エントリーポイントのcss
各ページ毎に読み込むcssは`app/bundles/stylesheets/entries`下に配置して、jsのエントリーポイントにてimportしてください。
さらに`stylesheet_bundle_tag`で読み込んでください。
例えば`app/bundles/stylesheets/entries/home/index.scss`というファイルは以下のように読み込むことができます。
```
# app/bundles/javascripts/entries/home/index.js
import '@style/entries/entries/home/index.scss'

# app/views/home/index.html.erb
<% content_for :bundle_css do %>
  <%= stylesheet_bundle_tag 'home/index' %>
<% end %>

<div class="container">
  ...何かしらのhtml
</div>
```
jsと同様に、必ず`content_for :bundel_js`を使用してください。
これによるアセットの設定先はheadタグになります。
もしこれを用いない場合、FOUC(Flash of Unstyled Content)という現象が起こる可能性があります。
繰り返しますが、必ず<b>jsのエントリーポイントにてscssのファイルをimportしてください。</b>
そうしないとwebpackがscssをビルドしてくれず、cssが`stylesheet_bundle_tag`の実行時にエラーが起きます。

# 何が入っているか?
このレポジトリに導入されている主要なライブラリや機能を紹介します。

## webpack/webpack-dev-server
このレポジトリのキモです。フロントエンドのアセットをビルドするために使っています。

### webpack
js, css, 画像ファイルをビルドします。ビルドしたファイルは`public/bundles`以下に出力します。
webpackでビルドしたファイルは、[このヘルパー](https://github.com/medpeer-inc/rails-webpack-template/blob/master/app/helpers/webpack_bundle_helper.rb)で定義されているメソッドで読み込むことができます。

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
- JSを変更した時差分のビルドをしてくれる(webpackのwatchと同じ)
- リロードせずに更新したファイルがブラウザに適用される(Hot module replacement, HMR)
- 上記のHMRができない場合は自動的にブラウザをリロードし、更新分のアセットを取得する

という機能が使えます。是非使ってみてください。

ただwebpack-dev-serverですがdocker上で動かす場合、dockerの設定とwebpack-dev-serverの設定(hostやportあたり)を調整する必要がある場合があります。
webpack-dev-server側は以下のファイルを修正する必要があるかもしれません。
```
https://github.com/medpeer-inc/rails-webpack-template/blob/master/webpack.dev.js#L8
https://github.com/medpeer-inc/rails-webpack-template/blob/master/config/dev_server_proxy.rb
https://github.com/medpeer-inc/rails-webpack-template/blob/master/config/environments/development.rb#L64
```

## babel系
jsを色々なブラウザで読み込めるように(例えば最新の記法が古いブラウザでも読み込めるように)変形/代替してくれるライブラリになります。
すでに設定済みなので、IE11とか気にせずにjsを書いても問題ありません。

このレポジトリのbabel変換における対象ブラウザ設定では、medpeer.jpの推奨環境より多少緩く設定しています。
https://github.com/medpeer-inc/rails-webpack-template/blob/master/webpack.common.js#L30

もし自分で設定したいよという場合は以下2つのサイトを参考に設定してみてください(やり方がよくわからないという場合はお近くのフロントエンドエンジニアまで)。
- https://github.com/browserslist/browserslist
- https://browserl.ist

## lint系
jsとcssのlintを設定しています。

### eslint
`app/bundles/javascripts`配下のjs及び単一ファイルコンポーネントファイル(.vue)をlint対象にしています。
`yarn run eslint`で実行できます。もし自動修正してほしい場合は`yarn run eslint:fix`を実行してください。

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

## Vue.js
デフォルトで入れておきました。
Vue.js以外を入れたい場合(jQuery, React, Angular等)はお近くのフロントエンドエンジニアまで相談してください。
そもそも「フレームワークいらねーよ」という方はVue.js周りの設定を剥ぎ取った上で、`package.json`からvueを削除してください(やり方がわからなかったらお近くのフロントエンドエンジニアまで)。

## axios
ajaxしたい時はaxiosを使ってください。くれぐれも`$.ajax`を使いたいという理由だけでjQueryを入れるのはやめましょう。

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
これに夢をみていた時代もありました。
しかし、いつまでたってもwebpack3系依存が抜けない(つまりwebpackのバージョンアップにwebpackerがついていけていない)のでwebpackerは諦めました。
webpackが昔のバージョンのままだと、他のnpmパッケージのバージョンアップにかなり制限がかかるのでもうwebpacker捨てちまおうという判断です。

# 注意点
- npmコマンドでパッケージを追加しないでください。yarnでやってください。

# 参考資料
以下記事を参考にwebpack, webpack-dev-serverとrailsのつなぎこみ部分を実装させていただきました。
記事ありがとうございました！

- https://inside.pixiv.blog/subal/4615
- https://medium.com/studist-dev/goodbye-webpacker-183155a942f6

