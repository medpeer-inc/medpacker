const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  devServer: {
    // NOTE: for ssl
    // https: true,
    publicPath: "/bundles/",
    contentBase: path.resolve(__dirname, "public", "bundles"),
    host: "0.0.0.0",
    port: 3035,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
});
