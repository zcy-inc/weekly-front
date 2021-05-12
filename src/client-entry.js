import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import createApp from './app';
import configureStore from './store';
import './common/style/reset.css';
import './common/style/common.css';

const initialState = window && window.__INITIAL_STATE__;

const store = configureStore(initialState);

Loadable.preloadReady().then(() => {
  const App = createApp({ store });
  hydrate(App, document.getElementById('root'));
});

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./store/reducers.js', () => {
      const newReducer = require('./store/reducers.js');
      store.replaceReducer(newReducer);
    });
    module.hot.accept('./app.js', () => {
      const newReducer = require('./store/reducers.js');
      store.replaceReducer(newReducer);
      const App = require('./app.js')({ store });
      hydrate(App, document.getElementById('root'));
    });
  }
}
