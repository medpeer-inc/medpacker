import '@style/entries/application.scss';
// remote: true使う場合コメント外してください。
// import "rails-ujs";

// なぜかaxiosでPromiseがundefinedになる現象が起こる。axios実行前にPromiseを呼び出すとなぜか回避できるのでやっておく
Promise;
