import React from 'react';
import { storiesOf } from '@storybook/react';
import { EventList } from '../components/EventList/EventList';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { BrowserRouter as Router } from 'react-router-dom';

const events = [
  {
    id: 123,
    cover: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    description:
      'First React Meetup contains talks related to getting strated with React Framework',
    title: 'React Meetup#01',
  },
  {
    id: 124,
    cover: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg',
    title: 'React Meetup#02',
    description: 'Second React talk following the first React Meetup',
  },
];

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
