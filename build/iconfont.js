const path = require( 'path' );
const glob = require( 'glob' );
const webfontsGenerator = require( 'webfonts-generator' );

const FILE_NAME     = 'icon';
const CLASS_NAME    = 'Icon';
const SRC_DIR       = 'src/fonts/';
const SCSS_DIST_DIR = 'src/scss/common/';
const FONT_DIST_DIR = 'dist/fonts/';

const files = glob.sync( `${ SRC_DIR }/*.svg` );
const codepoints = {};

function getIconName( filename ) {

	return path.basename( filename ).replace( /^u.+?-(.+)\.svg$/i, '$1' );

}

files.forEach( filename => {

	const name = kebabToCamel( getIconName( filename ) );
	const point = path
		.basename( filename )
		.split( '-' )[ 0 ]
		.slice( 1 );
	codepoints[ name ] = parseInt( `0x${ point }`, 16 );

} );

function done( error ) {

	if ( error ) {

		console.log( 'icon font build failed!', error );

	} else {

		console.log( 'icon font build completed.' );

	}

}

function kebabToCamel( string ) {

	return string.replace( /-./g, ( letter ) => letter.charAt( 1 ).toUpperCase() );

}

const options = {
	files,
	dest: FONT_DIST_DIR,
	fontName: FILE_NAME,
	types: [ 'woff', 'woff2' ],
	cssDest: `${ SCSS_DIST_DIR }/_icon-vars.scss`,
	cssTemplate: `${ SRC_DIR }/_icon-vars.scss.hbs`,
	templateOptions: {
		fontName: FILE_NAME,
		baseSelector: `.${ CLASS_NAME }`,
		classPrefix: CLASS_NAME,
	},
	codepoints,
	rename: function ( filename ) {

		return kebabToCamel( getIconName( filename ) );

	},
	formatOptions: {
		woff: {
			clone: true,
		},
	},
};

webfontsGenerator( options, done );
