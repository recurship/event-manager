import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentHeader from '../components/ContentHeader/ContentHeader';
import { header } from './dataSet';

storiesOf('ContentHeader', module).add('default', () => {
  const story = <ContentHeader {...header} />;
  return story;
});
