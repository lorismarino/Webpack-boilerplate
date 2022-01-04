const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const RemovePlugin = require('remove-files-webpack-plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
// const CopyPlugin = require('copy-webpack-plugin')
// const glob = require('glob').sync
// const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = (env, options) => {
  return {
    entry: {
      main: {
        import: './src/assets/js/index.ts',
        filename: 'assets/js/bundle.[contenthash].js',
      },
      styles: './src/assets/scss/index.scss',
      // sprite: glob('./src/assets/icons/*.svg'),
      // images: glob('./src/assets/img/*.{jpg,png,svg}'),
    },
    devtool: options.mode === 'development' ? 'inline-source-map' : false,
    watch: options.mode === 'development',
    devServer: {
      watchFiles: ['src/**/*.twig', 'src/**/*.html'],
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      hot: true,
      compress: true,
      port: 9000,
    },
    module: {
      rules: [
        // {
        //   test: /\.(jpe?g|png|gif|svg)$/i,
        //   type: 'asset/resource',
        //   exclude: path.join(__dirname, 'src/assets/icons'),
        //   generator: {
        //     filename: 'assets/img/[name][ext]',
        //   },
        // },
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
          include: path.resolve(__dirname, 'src/assets/icons'),
          options: {
            extract: true,
            spriteFilename: 'assets/img/icons.svg',
          },
        },
        {
          test: /\.twig$/,
          use: 'twig-loader',
        },
        {
          test: /\.[jt]s$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            options.mode === 'production'
              ? MiniCssExtractPlugin.loader
              : 'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        },
      ],
    },
    performance: {
      hints: false,
    },
    optimization: {
      minimizer: [
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [['gifsicle'], ['jpegtran'], ['optipng'], ['svgo']],
            },
          },
        }),
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    plugins: [
      // new SpriteLoaderPlugin(),
      // new CopyPlugin({
      //   patterns: [{ from: 'src/assets/fonts', to: 'assets/fonts' }],
      // }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/bundle.[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/templates/pages/index.html.twig',
        chunks: ['main', 'styles'],
      }),
      new ESLintPlugin(),
      new StylelintPlugin(),
      new RemovePlugin({
        before: {
          include: ['./dist'],
        },
        after: {
          include: ['./dist/styles.js', './dist/images.js', './dist/sprite.js'],
        },
      }),
    ],
  }
}
