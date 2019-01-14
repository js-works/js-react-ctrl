import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import replace from 'rollup-plugin-replace'
import typescript from 'rollup-plugin-typescript2'
import { uglify } from 'rollup-plugin-uglify'
import { terser } from 'rollup-plugin-terser'
import gzip from 'rollup-plugin-gzip'

const configs = []

for (const format of ['umd', 'cjs', 'amd', 'esm']) {
  for (const productive of [true, false]) {
    configs.push(createConfig(format, productive))
  }
}

export default configs

// ------------------------------------------------------------------

function createConfig(moduleFormat, productive) {
  return {
    input: 'src/main/index.ts',

    output: {
      file: productive
        ? `dist/js-react-ctrl.${moduleFormat}.production.js`
        : `dist/js-react-ctrl.${moduleFormat}.development.js`,

      format: moduleFormat,
      name: 'jsReactCtrl', 
      sourcemap: productive ? false : 'inline',

      globals: {
        'react': 'React',
        'js-spec': 'jsSpec'
      }
    },

    external: productive ? ['react', 'js-spec'] : ['react'],

    plugins: [
      resolve(),
      commonjs(),
      replace({
        exclude: 'node_modules/**',
        
        values: {
          'process.env.NODE_ENV': productive ? "'production'" : "'development'"
        }
      }),
      typescript({
        exclude: 'node_modules/**'
      }),
      productive && (moduleFormat === 'esm' ? terser() : uglify()),
      productive && gzip()
    ],
  }
}
