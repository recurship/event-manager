import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventList } from '../components/EventList/EventList';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { BrowserRouter as Router } from 'react-router-dom';
import { events } from './mock-data/data';

storiesOf('EventList', module)
  .addDecorator(story => <Router>{story()}</Router>)
  .add(
    'EventList',
    withInfo(`
      Events List component shows the list view of events in the application.
      
      ~~~js
      <EventList />
      ~~~
    
    `)(() => {
      const story = <EventList events={events} />;
      return story;
    })
  );
