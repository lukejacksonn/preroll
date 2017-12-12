#!/usr/bin/env node

var rollup = require('rollup')
var buble = require('rollup-plugin-buble')
var commonjs = require('rollup-plugin-commonjs')
var resolve = require('rollup-plugin-node-resolve')
var uglify = require('rollup-plugin-uglify')
var serve = require('rollup-plugin-serve')
var livereload = require('rollup-plugin-livereload')

var dev = process.argv.slice(2).length > 0

var op = op || {}

var outPath =
  op.out &&
  op.out
    .split('/')
    .slice(0, -1)
    .join('')

const inputOptions = {
  input: op.in || 'src/index.js',
  plugins: [
    resolve({ jsnext: true }),
    commonjs(),
    buble({ jsx: 'h' }),
    !dev && uglify(),
    dev && livereload(outPath || 'static'),
    dev &&
      serve({
        contentBase: [outPath || 'static'],
        historyApiFallback: true,
        port: 8080,
      }),
  ],
}

const outputOptions = {
  file: op.out || 'static/index.js',
  sourcemap: dev && 'inline',
  format: op.format || 'iife',
}

const watchOptions = {
  ...inputOptions,
  output: outputOptions,
}

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions)

  console.log(bundle.imports) // an array of external dependencies
  console.log(bundle.exports) // an array of names exported by the entry point
  console.log(bundle.modules) // an array of module objects

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions)

  // or write the bundle to disk
  await bundle.write(outputOptions)
}

function watch() {
  const watcher = rollup.watch(watchOptions)
  watcher.on('event', event => {
    event.code === 'BUNDLE_START' && console.log(event)
    event.code === 'BUNDLE_END' && console.log(event)

    // event.code can be one of:
    //   START        — the watcher is (re)starting
    //   BUNDLE_START — building an individual bundle
    //   BUNDLE_END   — finished building a bundle
    //   END          — finished building all bundles
    //   ERROR        — encountered an error while bundling
    //   FATAL        — encountered an unrecoverable error
  })
}

dev ? watch() : build()

// return rollup.rollup({
//   input: op.in || 'src/index.js',
//   plugins: [
//     resolve({ jsnext: true }),
//     commonjs(),
//     buble({ jsx: 'h' }),
//     !dev && uglify(),
//     dev && livereload(outPath || 'static'),
//     dev && serve({
//       contentBase: [outPath || 'static'],
//       historyApiFallback: true,
//       port: 8080,
//     })
//   ]
// }).then(bundle => )

// module.exports = function(op) {
//
//   op = op || {}
//
//   var outPath = op.out && op.out.split('/').slice(0,-1).join('')
//
//   return {
//     input: op.in || 'src/index.js',
//     output: {
//       file: op.out || 'static/index.js',
//       sourcemap: dev && 'inline',
//       format: op.format || 'iife',
//     },
//     plugins: [
//       resolve({ jsnext: true }),
//       commonjs(),
//       buble({ jsx: 'h' }),
//       !dev && uglify(),
//       dev && livereload(outPath || 'static'),
//       dev && serve({
//         contentBase: [outPath || 'static'],
//         historyApiFallback: true,
//         port: 8080,
//       })
//     ]
//   }
//
// }
