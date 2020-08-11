import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()
const port = process.env.PORT || 3001

const contentFolder = path.join(__dirname, '../content')
app.use('/content', express.static(contentFolder))

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const config = require('../../src/webpack.config.js')
const htmlIndex = '../app/index.html'

const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: false,
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get('*', function response (req, res) {
  res.write(fs.readFileSync(path.join(__dirname, htmlIndex)))
  res.end()
})

app.listen(port, '0.0.0.0', function onStart (err) {
  if (err) {
    console.log(err)
  }
  console.info(`Web Server is now running on http://localhost:${port}`)
})
