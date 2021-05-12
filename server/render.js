const fs = require('fs');
const path = require('path');
const { renderToString } = require('react-dom/server');
const { Helmet } = require('react-helmet');
const { getBundles } = require('react-loadable/webpack');
const { matchRoutes } = require('react-router-config');
const { matchPath } = require('react-router-dom');
const stats = require('../react-loadable.json');
const { configureStore, createApp, routesConfig } = require('./server-entry');

const createStore = (configureStore) => {
  const store = configureStore();
  return store;
};

const createTags = (modules) => {
  /**
   * 根据生产环境下 webpack 打包生成的 react-loadable.json 数据
   * 挑选要加载的chunks
   */
  const bundles = getBundles(stats, modules);
  const scriptfiles = bundles.filter(bundle => bundle.file.endsWith('.js'));
  console.log('n\n\n\n\n\\n***************', scriptfiles);

  const stylefiles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  const scripts = scriptfiles
    .map(script => `<script src="/${script.file}"></script>`)
    .join('\n');
  const styles = stylefiles
    .map(style => `<link href="/${style.file}" rel="stylesheet"/>`)
    .join('\n');
  return {
    scripts,
    styles,
  };
};

const prepHTML = (
  data,
  { html, head, rootString, scripts, styles, initState, cssStr }
) => {
  console.log(data, html, head);
  data = data.replace('<html', `<html ${html}`);
  data = data.replace(
    '</head>',
    `${head} \n ${styles}<style>${cssStr}</style></head>`
  );
  data = data.replace(
    '<div id="root"></div>',
    `<div id="root">${rootString}</div>`
  );
  data = data.replace(
    '<body>',
    `<body> \n <script>window.__INITIAL_STATE__ =${JSON.stringify(
      initState
    )}</script>`
  );
  data = data.replace('</body>', `${scripts}</body>`);
  return data;
};

const getMatch = (routesArray, url) => {
  return routesArray.some(router =>
    matchPath(url, {
      path: router.path,
      exact: router.exact,
    })
  );
};

const makeup = (ctx, store, createApp, html) => {
  /* 获取初始state */
  const initState = store.getState();
  const context = {
    css: [],
  };

  /* 当前页面要加载的chunk[App 中的 Loadable.Capture 会告诉你的] */
  const modules = [];

  const rootString = renderToString(
    createApp({
      modules,
      store,
      context,
      url: ctx.url,
    })
  );

  const { scripts, styles } = createTags(modules);

  /* SEO优化 */
  const helmet = Helmet.renderStatic();

  // const cssStr = context.css ? context.css : '';
  const cssStr = context.css ? context.css.join('') : '';

  /* 填充好html */
  const renderedHtml = prepHTML(html, {
    html: helmet.htmlAttributes.toString(),
    head: helmet.meta.toString() + helmet.link.toString(),
    rootString,
    scripts,
    styles,
    initState,
    cssStr,
  });

  return renderedHtml;
};

module.exports = async (ctx, next) => {
  /* 读取打包后的html文件 */
  const html = fs.readFileSync(
    path.join(path.resolve(__dirname, '../app'), 'index.html'),
    'utf-8'
  );

  /* 创建store */
  const store = createStore(configureStore);

  /* 匹配上的路径 */
  const branch = matchRoutes(routesConfig, ctx.url);

  /* 在服务端拉取数据 */
  const promises = branch.map(({ route }) => {
    /* 拿到url params query等 */
    const matchInfo = matchPath(ctx.url, route);
    return route.loadData
      ? route.loadData(store, matchInfo)
      : Promise.resolve(null);
  });

  /* 等待拉取数据结束 */
  await Promise.all(promises).catch(err => console.log('err:---', err));

  /* 是否匹配上 */
  const isMatch = getMatch(routesConfig, ctx.url);

  /* 匹配上 */
  if (isMatch) {
    /* 服务端react渲染 */
    const renderedHtml = await makeup(ctx, store, createApp, html);
    ctx.body = renderedHtml;
  }

  await next();
};
