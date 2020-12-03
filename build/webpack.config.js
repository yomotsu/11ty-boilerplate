const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env, argv ) => {

	const config = {
		entry: {
			'assets/js/bundle': './src/js/index.js',
			'assets/css/style': './src/scss/index.scss',
		},
		output: {
			path: path.resolve( __dirname, '../dist' ),
			filename: '[name].js',
		},
		target: 'web',
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ 'babel-loader' ],
				},

					{
					test: /\.(css|scss)$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
							options: {
								url: false,
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: require( './postcss.config' ),
							},
						},
						{
							loader: 'sass-loader',
							options: {
								implementation: require( 'sass' ),
							},
						},
					],
				},
			],
		},

		resolve: {
			modules: [ 'node_modules' ],
			extensions: [ '.js', '.jsx', 'scss' ],
		},

		devServer: {
			host: '0.0.0.0',
			port: 3000,
			contentBase: [
				path.resolve( __dirname, '../dist/' ),
				path.resolve( __dirname, '../static/' ),
			],
			watchContentBase: true,
			watchOptions: {
				poll: 1000,
				// poll: true,
				ignored: [ '../node_modules/' ],
			},
			open: true,
			// hot: true,
			inline: true,
			noInfo: true,
		},

		plugins: [
			new MiniCssExtractPlugin( {
				filename: '[name].css',
			} ),
			...(
				argv.mode === 'production' ? [
					new webpack.LoaderOptionsPlugin( {
						minimize: true
					} ),
				] : [
					new webpack.HotModuleReplacementPlugin(),
				]
			),
		],
		devtool: argv.mode === 'production' ? false : 'inline-source-map',

	};

	return config;

};
