import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { EditUserForm } from '../components/EditUserForm/EditUserForm';
import { user } from './dataSet';

const store = configureStore();

storiesOf('Edit User Profile', module).add('Edit User Form', () => {
  const story = (
    <Provider store={store}>
      <EditUserForm user={user} />
    </Provider>
  );
  return story;
});
