import React from 'react';
import { storiesOf } from '@storybook/react';
import ForgotPassword from '../containers/ForgotPassword/ForgotPassword';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

const store = configureStore();

storiesOf('Forgot Password', module).add('Enter Email', () => {
  const story = (
    <Provider store={store}>
      <ForgotPassword />
    </Provider>
  );
  return story;
});
