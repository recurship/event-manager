import React from 'react';
import ContentHeader from '../components/ContentHeader/ContentHeader';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

storiesOf('ContentHeader', module).add(
  'ContentHeader',
  withInfo(`
      Content Header Compoenent shows the header component.
      
      ~~~js
      <ContentHeader />
      ~~~
    
    `)(() => {
    const story = <ContentHeader heading={'Demo Heading'} />;
    return story;
  })
);
