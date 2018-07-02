import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(... [ thunk,  persistState(['userState', { key: 'eMgr'}]) ])
)

export default configureStore
