import React from 'react';
import { storiesOf } from '@storybook/react';
import CommentBox from '../components/Comments/CommentBox';

storiesOf('CommentBox', module).add('default', () => {
  const story = <CommentBox />;
  return story;
});
