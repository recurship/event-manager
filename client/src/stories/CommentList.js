import React from 'react';
import CommentList from '../components/Comments/CommentList';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { comments } from './mock-data/data';

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
