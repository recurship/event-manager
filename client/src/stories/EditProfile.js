import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { EditUserForm } from '../components/EditUserForm/EditUserForm';
import { withInfo } from '@storybook/addon-info';
import store from '../store/configureStore';
import { user } from './mock-data/data';

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
