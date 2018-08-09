import React from 'react';
import { storiesOf } from '@storybook/react';
import EditUserProfile from '../containers/EditProfile/EditUserProfile';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { EditUserForm } from '../components/EditUserForm/EditUserForm';

const store = configureStore();

const user = {
  firstName: 'Jav',
  lastName: 'nisar',
  username: 'Javaeria',
  email: 'javeria@gmail.com',
};

storiesOf('Edit User Profile', module).add('Edit User Form', () => {
  const story = (
    <Provider store={store}>
      <EditUserForm user={user} />
    </Provider>
  );
  return story;
});
