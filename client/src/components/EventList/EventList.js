import React, { Component } from 'react';
import { EventCard } from './EventCard/EventCard';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { SubHeader } from './SubHeader/SubHeader';

export class EventList extends Component {
  render() {
    const eventArray = this.props.events;
    return (
      <Container id="event-list">
        <Row>
          {eventArray.map(item => (
            <Col md="4" className="col-padding">
              <EventCard key={item.id} event={item} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
