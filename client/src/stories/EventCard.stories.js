import React from 'react';
import { storiesOf } from '@storybook/react';
import EventCard from '../components/EventList/EventCard/EventCard';
import { BrowserRouter, Route } from 'react-router-dom';
import { event } from './dataSet';

storiesOf('EventList/EventCard', module).add('default', () => {
  const story = (
    <BrowserRouter>
      <EventCard event={event} />
    </BrowserRouter>
  );
  return story;
});

storiesOf('EventList/EventCard', module).add('without details', () => {
  const story = (
    <BrowserRouter>
      <EventCard event={event.id} />
    </BrowserRouter>
  );
  return story;
});
