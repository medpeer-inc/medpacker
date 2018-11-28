const merge = require("webpack-merge");
const common = require("./webpack.common.js");
// minify css when production
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// minify js when using optimize-css-assets-webpack-plugin
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "none",
  optimization: {
    minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})]
  }
});
