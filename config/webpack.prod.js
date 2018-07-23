const path = require('path')
const merge = require('webpack-merge')
const webpackConfig = require('./webpack.config')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = merge(
  webpackConfig, {
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist'], {
        root: path.resolve(__dirname, '..')
      }),
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash:8].css'
      }),
      new OptimizeCSSAssetsPlugin({}),
      new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    ]
  })
