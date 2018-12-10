import React from 'react';
import CommentList from '../components/Comments/CommentList';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const comments = [
  {
    id: 1,
    commentedBy: {
      avatar: '',
      username: 'jack',
    },
    comment: 'Nice work guys',
  },
  {
    id: 1,
    commentedBy: {
      avatar: '',
      username: 'william',
    },
    comment: 'When is registration starting?',
  },
];

storiesOf('CommentList', module).add(
  'CommentList',
  withInfo(`
      CommentList Component demonstrates the comments list view in the application.
    
      ~~~js
      <CommentList />
      ~~~
    
    `)(() => {
    const story = <CommentList comments={comments} />;
    return story;
  })
);
