// @flow

import React from 'react';
import { Provider } from 'react-redux';
import App from '../App/App';

type Props = {
  store: Object
};

const Root = ({ store }: Props) => (
  <Provider store={store}>
    <div>
      <App />
    </div>
  </Provider>
);

export default Root;