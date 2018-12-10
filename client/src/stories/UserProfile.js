import React from 'react';
import UserProfile from '../components/UserProfile/UserProfile';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { store } from '../index';
import { Provider } from 'react-redux';

const user = {
  firstName: 'James',
  lastName: 'John',
  username: 'jam.jo',
  email: 'john.james@gmail.com',
};

storiesOf('UserProfile', module).add(
  'UserProfile',
  withInfo(`
      User Profile container to demonstrate the profile feature of the application.
      
      ~~~js
      <UserProfile />
      ~~~
    
    `)(() => {
    const story = <UserProfile user={user} />;
    return story;
  })
);
