const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );
const CopyWebpackPlugin = require( 'copy-webpack-plugin' );
const ExtractCSS = require( 'mini-css-extract-plugin' );
const OptimizeCSS = require( 'csso-webpack-plugin' ).default;
const OptimizeJS = require( 'terser-webpack-plugin' );
const { WebpackManifestPlugin } = require( 'webpack-manifest-plugin' );
const RemoveStyleJS = require( 'webpack-remove-empty-scripts' );

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
	mode    : devMode ? 'development' : 'production',
	cache   : devMode,
	devtool : devMode ? 'source-map' : false,
	stats   : devMode ? 'normal' : 'minimal',

	optimization : {
		minimize  : ! devMode,
		minimizer : [
			new OptimizeJS(
				{
					extractComments : true,
				},
			),
			new OptimizeCSS(),
		],
	},

	plugins : [
		new RemoveStyleJS(),
		new CleanWebpackPlugin( {
			cleanStaleWebpackAssets : false,
		} ),
		new ExtractCSS( {
			filename : `[name].css`,
		} ),
		new WebpackManifestPlugin(),
		// new CopyWebpackPlugin( {
		// 	patterns : [
		// 		{
		// 			context : path.resolve( __dirname, 'src' ),
		// 			from    : '**/*.{jpg,jpeg,png,gif,svg,eot,ttf,woff,woff2}',
		// 			to      : '[path][name][ext]',
		// 		},
		// 	],
		// } ),
	],

	module : {
		rules : [
			{
				test : /\.css$/i,
				use  : [
					ExtractCSS.loader,
					{
						loader  : 'css-loader',
						options : {
							sourceMap : true,
							url       : false,
						},
					},
					{
						loader : 'postcss-loader',
					},
				],
			},

			{
				test    : /\.js$/,
				exclude : /node_modules/,
				use     : {
					loader  : 'babel-loader',
					options : {
						presets : [
							'@wordpress/default',
						],
					},
				},
			},
		],
	},

	entry : {
		'app' : path.resolve( __dirname, 'src/js/app.js' ),
		'style' : path.resolve( __dirname, 'src/css/style.css' ),
	},

	output : {
		path       : path.resolve( __dirname, 'dist/' ),
		publicPath : 'dist/',
	},
};
