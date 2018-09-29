import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/Root/Root';
import configureStore from './store/configureStore';
import { unregister } from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';

export const store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <Root />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// registerServiceWorker();
unregister();
