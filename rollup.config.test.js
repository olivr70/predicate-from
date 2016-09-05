// docs at https://github.com/rollup/rollup/wiki/Command-Line-Interface

import eslint from 'rollup-plugin-eslint';
import strip from 'rollup-plugin-strip';

export default {
  entry: 'test/main_spec.js',
  plugins: [ 
        eslint()
        , strip( { sourceMap:false }) 
         ],
  targets: [
    { dest: 'lib/main_spec.js', format: 'cjs' },
  ]
};