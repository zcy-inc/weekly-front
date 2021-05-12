import React from 'react';
import Loadable from 'react-loadable';
import { homeLoadData } from '../views/Home/store/actionCreators';
import { detailLoadData } from '../views/Detail/store/actionCreators';
import { summaryLoadData } from '../views/Summary/store/actionCreators';

const Loading = () => {
  return <div className="lmask" />;
};

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName: 'Home' */ '../views/Home'),
  loading: Loading,
});

const LoadableDetail = Loadable({
  loader: () => import(/* webpackChunkName: 'Detail' */ '../views/Detail'),
  loading: Loading,
});

const LoadableSummary = Loadable({
  loader: () => import(/* webpackChunkName: 'Summary' */ '../views/Summary'),
  loading: Loading,
});
const routesConfig = [
  {
    path: '/',
    exact: true,
    component: LoadableHome,
    loadData: homeLoadData,
  },
  {
    path: '/detail/:week',
    component: LoadableDetail,
    loadData: detailLoadData,
  },
  {
    path: '/summary',
    component: LoadableSummary,
    loadData: summaryLoadData,
  },
];

export default routesConfig;
