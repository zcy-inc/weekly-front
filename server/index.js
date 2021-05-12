require('./ignore.js')();
require('babel-polyfill');

const isProd = true;

if (isProd) {
  require('babel-register')();
} else {
  require('babel-register')({
    presets: ['react', 'stage-0', ['env', { targets: { node: 'current' } }]],
    plugins: [
      'dynamic-import-node',
      'react-loadable/babel',
      'transform-decorators-legacy',
    ],
  });
}
const Koa = require('koa');

const app = new Koa();

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const {
  isHttps,
  httpsOption: { key, cert },
} = require('./httpsConfig');

const options = {};
isHttps &&
  Object.assign(options, {
    key: fs.readFileSync(key),
    cert: fs.readFileSync(cert),
  });

const render = require('./render.js');

const port = process.env.port || 3002;
const staticCache = require('koa-static-cache');
const cors = require('koa2-cors');
const Loadable = require('react-loadable');

app.use(cors());
app.use(render);
app.use(
  staticCache(path.resolve(__dirname, '../app'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
  })
);

console.log(
  `\n==> 🌎  Listening on port ${port}. Open up ${
    isHttps ? 'https' : 'http'
  }://localhost:${port}/ in your browser.\n`
);
Loadable.preloadAll().then(() => {
  // app.listen(port);
  (isHttps ? https : http).createServer(options, app.callback()).listen(port);
});
