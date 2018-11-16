const glob = require("glob");
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");
// extract css from bundled javascript
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// minify css when production
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// minify js when using optimize-css-assets-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");

const bundles = path.join(__dirname, "app", "bundle", "javascript", "entries");

const targets = glob.sync(path.join(bundles, "**/*.{js,jsx,ts,tsx}"));
const entry = targets.reduce((entry, target) => {
  const bundle = path.relative(__dirname, target);
  const filename = path.relative(bundles, target);

  const ext = path.extname(filename);

  return Object.assign({}, entry, {
    // Input: "application.js"
    // Output: { "application": "./app/bundle/javascript/bundles/application.js" }
    [filename.replace(ext, "")]: "./" + bundle // TODO: Refactor
  });
}, {});

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: entry,
  output: {
    filename: "js/[name]-[hash].js",
    chunkFilename: "js/[name].bundle-[hash].js",
    path: path.resolve(__dirname, "public", "bundles"),
    publicPath: "/bundles/"
  },
  plugins: [
    new ManifestPlugin({
      fileName: "manifest.json",
      publicPath: "/bundles/",
      writeToFileEmit: true
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name]-[hash].css",
      chunkFilename: "style/[name].bundle-[hash].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
};
