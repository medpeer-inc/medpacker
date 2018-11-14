const glob = require("glob");
const path = require("path");
const ManifestPlugin = require("webpack-manifest-plugin");

const packs = path.join(__dirname, "app", "javascript", "packs");

const targets = glob.sync(path.join(packs, "**/*.{js,jsx,ts,tsx}"));
const entry = targets.reduce((entry, target) => {
  const bundle = path.relative(__dirname, target);
  const filename = path.relative(packs, target);

  const ext = path.extname(filename);

  return Object.assign({}, entry, {
    // Input: "application.js"
    // Output: { "application": "./app/javascript/packs/application.js" }
    [filename.replace(ext, "")]: "./" + bundle // TODO: Refactor
  });
}, {});

console.log(entry);

module.exports = {
  mode: process.env.NODE_ENV || "development",
  entry: entry,
  output: {
    filename: "[name]-[hash].js",
    chunkFilename: "[name].bundle-[hash].js",
    path: path.resolve(__dirname, "public", "packs"),
    publicPath: "/packs/"
  },
  plugins: [
    new ManifestPlugin({
      fileName: "manifest.json",
      publicPath: "/packs/",
      writeToFileEmit: true
    })
  ]
};
