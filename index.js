var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')
var serve = require('rollup-plugin-serve')
var livereload = require('rollup-plugin-livereload')
var postcss = require('rollup-plugin-postcss')
var nested = require('postcss-nested')

module.exports = function(dev) {
  return [
    postcss({ plugins: [nested()] }),
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
