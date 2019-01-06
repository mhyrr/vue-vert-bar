import buble from 'rollup-plugin-buble'

export default {
  entry: 'src/index.js',
  plugins: [buble()],
  moduleName: 'vuevertbars',
  targets: [
    { dest: 'dist/vuevertbars.js', format: 'umd' },
    { dest: 'dist/vuevertbars.common.js', format: 'cjs' },
    { dest: 'dist/vuevertbars.esm.js', format: 'es' }
  ]
}
