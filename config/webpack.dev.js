const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const webpack = require('webpack')
const ip = require('ip')

module.exports = merge(
  webpackConfig, {
    mode: 'development',
    watch: true,
    devtool: 'cheap-module-eval-source-map',
    devServer: {
      contentBase: path.resolve(__dirname, '..'),
      watchContentBase: true,
      host: ip.address(),
      hot: true,
      open: true
    },
    module: {
      rules: []
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
