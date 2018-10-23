import React from 'react';
import { storiesOf } from '@storybook/react';
import UserProfile from '../components/UserProfile/UserProfile';
import { profile } from './dataSet';

storiesOf('UserProfile', module).add('default', () => {
  const story = <UserProfile user={profile} />;
  return story;
});
