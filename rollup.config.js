const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');

export default [
  {
    input: 'src/index',
    output: {
      file: './lib/async-fetch-client.js',
      format: 'cjs',
    },
    plugins: [
      resolve(),
      babel({
        babelrc: false,
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['ie 11', 'ios 7'],
              },
              modules: false,
            },
          ],
          'flow',
        ],
      }),
    ],
  },
];
