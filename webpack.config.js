const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const glob = require('glob').sync
const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')

module.exports = (env, options) => ({
  mode: options.mode === 'production' ? 'production' : 'development',
  watch: options.mode !== 'production',
  devtool:
    options.mode === 'production' ? 'none' : 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    compress: true,
    port: 4000
  },
  entry: {
    index: './assets/js/controllers/Index.js',
    sprite: glob('./assets/sprite/*.svg')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          options.mode === 'production'
            ? MiniCssExtractPlugin.loader
            : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ttf$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        }
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: [path.resolve(__dirname, 'assets/sprite')],
        use: {
          loader: 'file-loader',
          options: {
            name: 'assets/img/[name].[ext]'
          }
        }
      },
      {
        test: /\.twig$/,
        use: ['raw-loader', 'twig-html-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: path.resolve(__dirname, 'assets/sprite'),
        options: {
          extract: true,
          spriteFilename: 'assets/img/sprite.svg'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './templates/pages/index.twig',
      chunks: ['index']
    }),
    new SpriteLoaderPlugin(),
    new ESLintPlugin(),
    new CopyWebpackPlugin([{ from: './assets/img', to: 'assets/img' }]),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new StylelintPlugin()
  ]
})
