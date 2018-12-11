import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import persistState from 'redux-localstorage';

const configureStore = preloadedState =>
  createStore(
    rootReducer,
    preloadedState,
    compose(
      persistState(['userState', { key: 'eMgr' }]),
      applyMiddleware(...[thunk])
    )
  );

export default configureStore;
