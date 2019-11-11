const path = require( 'path' );
const webpack = require( 'webpack' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = ( env, argv ) => {

	const config = {
		entry: {
			'dist/assets/js/bundle': './src/js/main.js',
			'dist/assets/css/style': './src/scss/main.scss',
		},
		output: {
			path: path.resolve( __dirname, '../' ),
			filename: '[name].js',
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ 'babel-loader' ],
				},

				{
					test: /\.(css|scss)$/,
					// test: /\/src\/style\.scss$/,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						{
							loader: 'css-loader',
						},
						{
							loader: 'postcss-loader',
							options: require( './postcss.config' ),
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
			contentBase: path.resolve( __dirname, '../dist/' ),
			watchContentBase: true,
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
					new webpack.NamedModulesPlugin(),
					new webpack.HotModuleReplacementPlugin(),
				]
			),
		],
		devtool: argv.mode === 'production' ? false : 'inline-source-map',

	};

	return config;

};
