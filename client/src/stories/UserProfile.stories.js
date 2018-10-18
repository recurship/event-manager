import React from 'react';
import { storiesOf } from '@storybook/react';
import UserProfile from '../components/UserProfile/UserProfile';

const user = {
  username: 'Fariae',
  avatar:
    'https://www.google.com.pk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
};
storiesOf('UserProfile', module).add('default', () => {
  const story = <UserProfile user={user} />;
  return story;
});
