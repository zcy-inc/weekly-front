const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseWebpackConfig = require('./webpack.config.base');
/**
 * react-loadable 提供的 webpack 插件
 * 该插件将生成源文件与打包后的chunk文件的映射关系
 * 结合服务端渲染用于预加载
 */
const { ReactLoadablePlugin } = require('react-loadable/webpack');
const util = require('./util');
const { isHttps } = require('../config/httpsConfig');

const isProd = process.env.NODE_ENV === 'production';

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.js'),
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist/app'),
    filename: `static/js/[name].[${isProd ? 'chunkhash' : 'hash'}:8].js`,
    chunkFilename: 'static/js/[name].[chunkhash:8].js',
  },
  module: {
    rules: util.styleLoaders({
      sourceMap: isProd,
      usePostCSS: true,
      extract: isProd,
    }),
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) =>
        resource &&
        resource.indexOf('node_modules') >= 0 &&
        resource.match(/\.js$/),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'common-in-lazy',
      minChunks: ({ resource } = {}) =>
        resource && resource.includes('node_modules') && /axios/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => count >= 2,
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, '../src/favicon.ico') },
      {
        from: path.resolve(__dirname, '../static/images'),
        to: 'static/images',
      },
    ]),
    new HtmlWebpackPlugin({
      title: 'Zoo Weekly - 政采云前端小报',
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.ejs'),
      isHttps, // 是否开启https
    }),
  ],
});

if (!isProd) {
  webpackConfig.module.rules.unshift({
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      // eslint options (if necessary)
    },
  });
  webpackConfig.devServer = require('./devServer');
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
}

if (isProd) {
  webpackConfig.plugins.push(
    new ReactLoadablePlugin({
      filename: path.join(__dirname, '../dist/react-loadable.json'),
    })
  );
}

module.exports = webpackConfig;
