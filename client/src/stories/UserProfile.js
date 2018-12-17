import React from 'react';
import UserProfile from '../components/UserProfile/UserProfile';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { user } from './mock-data/data';

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
