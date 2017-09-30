# Preroll
> An opinionated web project builder with dev server

This is a collection of simple rollup-plugins that make developing ready to deploy, static web apps simple.

When ran, it builds files for production by default; all scripts get bundled, treeshaken, transpiled from `ES6` (including `JSX`) to `ES5` and then minified. Any styles imported in your code get included in the bundle and injected into the head on page load.

If you call `preroll(true)` then it will build the project and enter development mode; it watches project files, serves the contents of `static` on `localhost:8080` and live reloads the app in the browser when project files change.

## Includes

- [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs) - Convert CommonJS modules to ES2015
- [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) - Use the Node.js resolution algorithm with rollup
- [rollup-plugin-buble](https://www.npmjs.com/package/buble) - The blazing fast, batteries-included ES2015 compiler with rollup
- [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss) - Transforming styles with JS plugins and rollup
- [rollup-plugin-uglify](https://github.com/TrySound/rollup-plugin-uglify) - Rollup plugin to minify the generated bundle
- [rollup-plugin-serve](https://github.com/thgh/rollup-plugin-serve) - Serve your rolled up bundle like webpack-dev-server
- [rollup-plugin-livereload](https://github.com/thgh/rollup-plugin-livereload) - LiveReload your rollup bundle!

### Install as a dev dependency

```
npm i preroll -D
```

### Add preroll to rollup.config

```js
import preroll from 'preroll'

// If rollup was called with the watch flag
const dev = !!process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'static/index.js',
    sourcemap: dev ? 'inline' : false,
    format: 'iife',
  },
  plugins: [
    ...preroll(dev),
    // Add other rollup plugins here...
  ]
}
```

### Invoke rollup from package.json

```js
scripts: {
  build: 'rollup -c',   // <- Production build
  start: 'rollup -c -w' // <- Development mode
}
```
