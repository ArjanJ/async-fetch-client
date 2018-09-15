const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

export default [
	// browser-friendly UMD build
	{
		input: 'src/index',
		output: {
      file: './lib/index.js',
			format: 'cjs',
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},

	// // CommonJS (for Node) and ES module (for bundlers) build.
	// // (We could have three entries in the configuration array
	// // instead of two, but it's quicker to generate multiple
	// // builds from a single configuration where possible, using
	// // an array for the `output` option, where we can specify 
	// // `file` and `format` for each target)
	// {
	// 	input: 'src/main.js',
	// 	external: ['ms'],
	// 	output: [
	// 		{ file: pkg.main, format: 'cjs' },
	// 		{ file: pkg.module, format: 'es' }
	// 	]
	// }
];