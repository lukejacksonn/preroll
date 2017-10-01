// Scripts
var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')
var serve = require('rollup-plugin-serve')
var livereload = require('rollup-plugin-livereload')
// Styles
var postcssModules = require('postcss-modules')
var postcss = require('rollup-plugin-postcss')
var nested = require('postcss-nested')
var cssnano = require('cssnano')
var autoprefixer = require('autoprefixer')

var cssExportMap = {}

module.exports = function(dev) {
  return [
    postcss({
      plugins: [
        nested(),
        postcssModules({
          getJSON (id, exportTokens) {
            cssExportMap[id] = exportTokens;
          }
        }),
      ].concat(dev ? [] : [
        autoprefixer('last 2 versions'),
        cssnano(),
      ]),
      getExportNamed: false,
      getExport (id) {
        return cssExportMap[id];
      }
    }),
    resolve({ jsnext: true }),
    commonjs(),
    buble({ jsx: 'h' }),
    !dev && uglify(),
    dev && livereload('static'),
    dev && serve({
      contentBase: ['static'],
      historyApiFallback: true,
      port: 8080,
    })
  ]
}
