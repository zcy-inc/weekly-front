const path = require('path');
const webpack = require('webpack');

/**
 *  webpack-manifest-plugin
 *  该插件将生成一个manifest.json文件在输出文件夹下
 *  其中包含所有源文件名到其对应输出文件的映射
 */
const ManifestPlugin = require('webpack-manifest-plugin');

/**
 * progress-bar-webpack-plugin
 * 以百分比显示打包进度
 */
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

/**
 * uglifyjs-webpack-plugin
 * 压缩js文件
 */
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

/**
 * extract-text-webpack-plugin
 * 抽取css文件
 */
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let env = 'dev';
let isProd = false;
let prodPlugins = [];

if (process.env.NODE_ENV === 'production') {
  env = 'prod';
  isProd = true;
  prodPlugins = [
    new ManifestPlugin(),
    /**
     * 在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误。
     */
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({ sourceMap: true }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
    }),
  ];
}

module.exports = {
  devtool: isProd ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@components': path.join(__dirname, '../src/components'),
      '@utils': path.join(__dirname, '../src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)?$/,
        loader: 'babel-loader',
        options: {
          /* cacheDirectory是用来缓存编译结果，下次编译加速 */
          cacheDirectory: true,
        },
        /* 指定src文件下的内容 */
        include: path.join(__dirname, '../src'),
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/images/[name].[ext]',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require(`./${env}.env`),
    }),
    new ProgressBarPlugin(),
    ...prodPlugins,
  ],
};
