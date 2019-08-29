/**
 * @author yangbin
 * @date 2019/8/27
 * @Description: webpack打包配置
 */
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: {
    app: './main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
      }),
    ],
  },
  devtool: '#source-map'
}
