import React from 'react';
import { storiesOf } from '@storybook/react';
import ContentHeader from '../components/ContentHeader/ContentHeader';

const heading = 'Content header title';

storiesOf('ContentHeader', module).add('default', () => {
  const story = <ContentHeader heading={heading} />;
  return story;
});

storiesOf('ContentHeader', module).add('with different backgound', () => {
  const story = (
    <ContentHeader
      heading={
        <div style={{ background: '#343a40', color: 'white' }}>{heading}</div>
      }
    />
  );
  return story;
});

storiesOf('ContentHeader', module).add('with bigger font-size', () => {
  const story = <ContentHeader heading={<h1>{heading}</h1>} />;
  return story;
});

storiesOf('ContentHeader', module).add('with blue font-color', () => {
  const story = (
    <ContentHeader heading={<div style={{ color: 'blue' }}>{heading}</div>} />
  );
  return story;
});

storiesOf('ContentHeader', module).add('with black font-background', () => {
  const story = (
    <ContentHeader
      heading={
        <span style={{ background: 'black', color: 'white' }}>{heading}</span>
      }
    />
  );
  return story;
});
