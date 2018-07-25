import React, { Component } from 'react';
import EventCard from './EventCard/EventCard';
import { Container, Row } from 'reactstrap';

export class EventList extends Component {
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
