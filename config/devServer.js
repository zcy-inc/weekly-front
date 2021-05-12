/* webpack-dev-server配置 */
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  /* 服务根目录 默认指向项目根目录 */
  contentBase: isDev
    ? path.join(__dirname, '../')
    : path.join(__dirname, '../dist'),
  /* 所有404 定位到根路径 */
  historyApiFallback: true,
  /* 服务端口 */
  port: 3000,
  /* 热更新 */
  hot: true,
  /* 自动打开页面 */
  open: true,
  /* 数据Mock */
  before() {
    // apiMocker(app, path.resolve(__dirname, mockDataPath), {})
  },
  proxy: {
    // '/api': {
    //   target: 'http://119.29.241.71:3000/',
    //   pathRewrite: {
    //     '^/api': ''
    //   },
    //   /* 支持https */
    //   secure: false
    // }
  },
};
