import React from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Loadable from 'react-loadable';
import Layout from './layouts';
import configureStore from './store';
import { routesConfig } from './router';

const createApp = ({ modules, store, context, url }) => {
  return (
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter context={context} location={url}>
          <Layout />
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
  );
};

export { createApp, configureStore, routesConfig };
