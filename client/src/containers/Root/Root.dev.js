// @flow

import React from 'react';
import { Provider } from 'react-redux';
import DevTools from '../DevTools';
import App from '../App/App';

type Props = {
  store: Object
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>
);

export default Root;
