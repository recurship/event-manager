import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
import persistState from 'redux-localstorage';
const env = process.env.NODE_ENV;

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      persistState(['userState', { key: 'eMgr' }]),
      env === 'test'
        ? applyMiddleware(thunk)
        : applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
};

const configured = configureStore();

export default configured;
