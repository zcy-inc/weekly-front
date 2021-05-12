# 项目描述

政采云小报前端项目，收录插件投稿的前端小报内容，便于查看，并进行相关数据统计。

## 包含的页面

前端小报首页：启动页
![DC3807F3-E9D5-4BD0-9C94-1DC430F98BD1.png](https://sitecdn.zcycdn.com/f2e-assets/47666360-76be-4270-bb8c-6cb3a83e746a.png?x-oss-process=image/quality,Q_75/format,jpg)

前端小报详情页：/detail/${id}
![3EA087CA-585E-4EC7-80ED-32635B36247C.png](https://sitecdn.zcycdn.com/f2e-assets/daeb4961-4d09-4ae9-89c9-aa3bc53ebe7b.png?x-oss-process=image/quality,Q_75/format,jpg)

前端小报的数据统计页：/summary
![D73FB9BD-5F3F-423E-9980-34BF5DC463C3.png](https://sitecdn.zcycdn.com/f2e-assets/74b323f1-9c88-4a85-a3fd-af0d8efd92ff.png?x-oss-process=image/quality,Q_75/format,jpg)


# 启动

本地启动需要安装 Chrome 扩展 [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=zh-CN) （点击链接安装）
执行 `npm i` 安装依赖
在 `src/utils/request.js` 下的 `BASE_URL` 中配置您的 `ip`
执行 `npm run dev` 启动项目，该命令可以同时启动本地服务端和客户端。


## 配置您的信息

修改 `/src/components/Footer/index.js` 的组件代码、`/src/index.ejs` 的 `script` 内容，替换成您的网站信息。

![](https://zoo.team/images/upload/upload_e713076d880b8ff778bab67b39f4a81c.png)

# 技术选型


## 前端同构渲染

为了便于 SEO 爬取信息以及减少白屏时间的考量，我们选择前端同构渲染，使用一套代码，用户首次请求的页面在服务端渲染好，然后再是客户端渲染，也就是前端同构渲染原理。

一个填充好的 html => html string => 数据 store + 模板 route

### [ReactDOMServer](https://react.docschina.org/docs/react-dom-server.html#___gatsby)

ReactDOMServer 类可以让你在服务端渲染你的组件

### [react-router](https://reacttraining.com/react-router/web/guides/server-rendering)

服务端 react 代码需要根据请求的 path 知晓渲染哪一个页面

### [redux](http://cn.redux.js.org/docs/recipes/ServerRendering.html)

服务端需要提前将不同页面对应的数据请求操作执行,提供应用所需的初始 state,并且由于在服务端渲染时已经请求过对应数据，需要避免客户端再次请求。

## 其他依赖项

[React Helmet](https://github.com/nfl/react-helmet) 一个HTML文档head管理工具，管理对文档头的所有更改。


