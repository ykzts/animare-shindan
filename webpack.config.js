const CopyPlugin = require('copy-webpack-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = (_, argv) => {
  const isProd = argv.mode === 'production'

  return {
    devServer: {
      historyApiFallback: true
    },
    mode: isProd ? 'production' : 'development',
    module: {
      rules: [
        {
          exclude: /\/node_modules\//,
          loader: 'ts-loader',
          test: /\.tsx?/
        }
      ]
    },
    output: {
      chunkFilename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
      filename: isProd ? '[name].[chunkhash:5].js' : '[name].js',
      publicPath: '/'
    },
    plugins: [
      new CopyPlugin([path.resolve('src', 'static')]),
      new HtmlPlugin({
        minify: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        },
        template: './src/index.html'
      })
    ],
    resolve: {
      extensions: ['.tsx', '.ts', '.mjs', '.js']
    }
  }
}
