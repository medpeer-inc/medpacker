/* globals __dirname module */
const glob = require('glob');
const path = require('path');
const ManifestPlugin = require('webpack-manifest-plugin');
// extract css from bundled javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const bundles = path.join(
	__dirname,
	'app',
	'bundles',
	'javascripts',
	'entries'
);

const targets = glob.sync(path.join(bundles, '**/*.{js,jsx,ts,tsx}'));
const entry = targets.reduce((entry, target) => {
	const bundle = path.relative(__dirname, target);
	const filename = path.relative(bundles, target);

	const ext = path.extname(filename);

	return Object.assign({}, entry, {
		// Input: "application.js"
		// Output: { "application": "./app/bundles/javascripts/application.js" }
		[filename.replace(ext, '')]: './' + bundle
	});
}, {});

module.exports = {
	entry: entry,
	output: {
		filename: 'js/[name]-[hash].js',
		chunkFilename: 'js/[name].bundle-[hash].js',
		path: path.resolve(__dirname, 'public', 'bundles'),
		publicPath: '/bundles/'
	},
	plugins: [
		new ManifestPlugin({
			fileName: 'manifest.json',
			publicPath: '/bundles/',
			writeToFileEmit: true
		}),
		new MiniCssExtractPlugin({
			filename: 'style/[name]-[hash].css',
			chunkFilename: 'style/[name].bundle-[hash].css'
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.(ts|js)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' },
					{ loader: 'ts-loader',
						options: {
							appendTsSuffixTo: [/\.vue$/]
						}
				  }
				]
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							// css-loaderの前に噛ませるloaderの数
							importLoaders: 2
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								require('autoprefixer')(
									{
										grid: true
									}
								),
								require('postcss-flexbugs-fixes')
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {}
					},
					{
						loader: 'sass-resources-loader',
						options: {
							resources: ['app/bundles/stylesheets/variables.scss']
						},
					},
				]
			},
			{
				test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'img/[name]-[hash].[ext]'
						}
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					name: 'vendor',
					filename: 'js/vendor-[hash].js',
					chunks: 'initial',
					enforce: true
				}
			}
		}
	},
	resolve: {
		alias: {
			'@js': path.resolve(__dirname, 'app/bundles/javascripts'),
			'@style': path.resolve(__dirname, 'app/bundles/stylesheets'),
			'@image': path.resolve(__dirname, 'app/bundles/images'),
			'vue$': 'vue/dist/vue.esm.js'
		},
		extensions: [
			'.js',
			'.vue',
			'.ts'
		]
	},
	performance: {
		hints: 'warning', // default value
		maxEntrypointSize: 250000, // default value
		maxAssetSize: 250000 // default value
	}
};
