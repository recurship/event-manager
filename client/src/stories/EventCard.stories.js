import React from 'react';
import { storiesOf } from '@storybook/react';
import EventCard from '../components/EventList/EventCard/EventCard';
import { BrowserRouter, Route } from 'react-router-dom';

const event = {
  id: '1',
  title: 'EventCard',
  description:
    'Your email address fejaz@sastaticket.pk doesn have access to sastaticket.atlassian.net',
  startDatetime: '01/02/2018',
  cover:
    'https://www.google.com.pk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
};

storiesOf('EventList/EventCard', module).add('default', () => {
  const story = (
    <BrowserRouter>
      <EventCard event={event} />
    </BrowserRouter>
  );
  return story;
});

storiesOf('EventList/EventCard', module).add('without detail', () => {
  const story = (
    <BrowserRouter>
      <EventCard event={event.id} />
    </BrowserRouter>
  );
  return story;
});
