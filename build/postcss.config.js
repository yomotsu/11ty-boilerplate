module.exports = {
	plugins: [
		require( 'postcss-flexbugs-fixes' )(),
		require( 'autoprefixer' )( { grid: true } ),
		require( 'css-mqpacker' )(),
		require( 'cssnano' )(),
	],
};
