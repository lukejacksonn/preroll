# Preroll
> An opinionated web project builder with dev server

This is a collection of simple rollup-plugins that make developing ready to deploy, static web apps simple. It builds files for production by default; all scripts are  get transpiled (`ES6` and `JSX`) and minified. Any imported styles get bundled. If you pass `true` to preroll then it will build the project, watch the source files, serve them on localhost and live reload the app in the browser when changes occur.

### Install as a dev dependency

```
npm i preroll -D
```

### Add preroll to rollup plugins

```js
// An opinionated project builder with dev server
import preroll from 'preroll'

// If rollup was called with the watch flag
// then it is assumed this is a dev build
const dev = !!process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'static/index.js',
    // Add inline sourcemaps if in dev
    sourcemap: dev ? 'inline' : false,
    format: 'iife',
  },
  plugins: [
    // Use all the plugins from preroll
    // in dev or production mode
    ...preroll(dev),
    // Add any project specific rollup
    // plugins here as per usual
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

## Dependencies

- Developer task that rebuilds app when source files change using [rollup-watch](https://www.npmjs.com/package/rollup-watch)
- Reloads the browser when source files change using [rollup-plugin-livereload](https://www.npmjs.com/package/rollup-plugin-livereload)
- Bundle scripts supporting `ES6` and `JSX` transforms using [buble](https://www.npmjs.com/package/buble)
- Preprocessing and concatenating stylesheets using using [rollup-plugin-postcss](https://www.npmjs.com/package/rollup-plugin-postcss)
- Local static file server supporting HTML5 fallback using [rollup-plugin-server](https://www.npmjs.com/package/rollup-plugin-server)
