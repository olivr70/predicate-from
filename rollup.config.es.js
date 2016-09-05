// docs at https://github.com/rollup/rollup/wiki/Command-Line-Interface


// configuration for generating the ES6 module
// - result is an ES6 module
// - result contains ES6 code (not transpiled by Babel)
import eslint from 'rollup-plugin-eslint';
import strip from 'rollup-plugin-strip';

export default {
  entry: 'src/main.js',
  plugins: [ 
        eslint()
        , strip( { sourceMap:false }) 
         ],
  targets: [
    { dest: 'lib/main.es.js', format: 'es' },
  ]
};