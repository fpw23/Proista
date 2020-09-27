const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: [
    path.join(__dirname, './app/main.js')
  ],
  output: {
    path: path.join(__dirname, '../dist/app/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      AUTH_COOKIE_PREFIX: 'Proista',
      NODE_ENV: 'production'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './app/index.tpl.html'),
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'production' // use 'development' unless process.env.NODE_ENV is defined
    }),
    new WriteFilePlugin()
  ],
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}
