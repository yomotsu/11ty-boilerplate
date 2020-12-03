module.exports = ( eleventyConfig ) => {

	return {
		templateFormats: [
			'md',
			'njk',
			'html',
		],
		// pathPrefix: '/',
		// markdownTemplateEngine: 'liquid',
		htmlTemplateEngine: 'njk',
		dataTemplateEngine: 'njk',
		// passthroughFileCopy: true,
		dir: {
			input: 'src/njk',
			includes: '_includes', // ⚠️ This value is relative to your input directory.
			// data: '_data',
			output: 'dist',
		}
	};

};
