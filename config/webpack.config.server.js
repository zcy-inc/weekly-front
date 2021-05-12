const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const nodeExternals = require('webpack-node-externals');
const baseWebpackConfig = require('./webpack.config.base');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: path.resolve(__dirname, '../src/server-entry'),
  },
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server-entry.js',
    libraryTarget: 'commonjs2', // 打包成commonjs2规范
  },
  target: 'node', // 指定node运行环境
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '../src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'react',
              'stage-0',
              ['env', { targets: { node: 'current' } }],
            ],
            plugins: [
              'dynamic-import-node',
              'react-loadable/babel',
              'transform-decorators-legacy',
            ],
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ['isomorphic-style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_ENV': JSON.stringify('server'), // 指定React环境为服务端
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../server'),
      },
      {
        from: path.resolve(__dirname, '../package.json'),
      },
      {
        from: path.resolve(__dirname, '../.babelrc'),
      },
      {
        from: path.resolve(__dirname, '../config/httpsConfig.js'),
      },
    ]),
  ],
});

module.exports = webpackConfig;
