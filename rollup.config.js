const babel = require('rollup-plugin-babel');

export default [
  {
    input: 'src/index',
    output: {
      file: './lib/async-fetch-client.js',
      format: 'cjs',
    },
    plugins: [
      babel({
        babelrc: false,
        exclude: /node_modules/,
        plugins: ['@babel/transform-regenerator'],
        presets: ['@babel/env', '@babel/flow'],
      }),
    ],
  },
];
