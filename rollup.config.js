const { babel } = require('@rollup/plugin-babel');

module.exports = [
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
        plugins: [
          '@babel/transform-regenerator',
          ['@babel/transform-runtime'],
        ],
        presets: ['@babel/env', '@babel/flow'],
        babelHelpers: 'runtime'
      }),
    ],
  },
];
