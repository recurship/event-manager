import React from 'react';
import { storiesOf } from '@storybook/react';
import EditUserProfile from '../containers/EditProfile/EditUserProfile';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { EditUserForm } from '../components/EditUserForm/EditUserForm';
import { withInfo } from '@storybook/addon-info';

const store = configureStore();

const user = {
  firstName: 'Jav',
  lastName: 'nisar',
  username: 'Javaeria',
  email: 'javeria@gmail.com',
};

storiesOf('Edit User Profile', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'Edit User Form',
    withInfo(`
  Edit User profile forms gives a demo of the provided form.  

  ~~~js
  <EditUserForm />
  ~~~

`)(() => {
      const story = (
        <Provider store={store}>
          <EditUserForm user={user} />
        </Provider>
      );
      return story;
    })
  );
