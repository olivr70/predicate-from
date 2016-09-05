// docs at https://github.com/rollup/rollup/wiki/Command-Line-Interface

import eslint from 'rollup-plugin-eslint';
import strip from 'rollup-plugin-strip';
import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/main.js',
  plugins: [ 
        eslint()
        , strip( { sourceMap:false }) 
        , babel({
          presets: [ ["es2015" , { modules:false }] ]
        })
         ],
  moduleName: 'predicateFrom',
  targets: [
    { dest: 'lib/main.cjs.js', format: 'cjs' },
    { dest: 'lib/main.umd.js', format: 'umd' },
    { dest: 'lib/main.es.js', format: 'es' },
  ]
};