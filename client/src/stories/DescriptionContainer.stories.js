import React from 'react';
import { storiesOf } from '@storybook/react';
import DescriptionContainer from '../components/DescriptionContainer/DescriptionContainer';

storiesOf('DescriptionContainer', module).add('default', () => {
  const story = <DescriptionContainer />;
  return story;
});
