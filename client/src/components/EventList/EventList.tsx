import React, { Component } from 'react';
import EventCard from './EventCard/EventCard';
import { Container, Row } from 'reactstrap';
import { Events } from '../../types/multi-types';

type Props = Events;

export class EventList extends Component<Props> {
  render() {
    const eventArray = this.props.events;
    return (
      <Container id="event-list">
        <Row>
          {eventArray.map(item => <EventCard key={item.id} event={item} />)}
        </Row>
      </Container>
    );
  }
}
