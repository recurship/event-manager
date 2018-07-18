import React, { Component } from 'react';
import { EventPage } from './EventPage/EventPage';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { SubHeader } from './SubHeader/SubHeader';

export class EventList extends Component {
  render() {
    const eventArray = this.props.events;
    console.log('eventArray', this.props);
    return (
      <Container>
        <Row>
          {eventArray.map(item => (
            <Col md="4">
              <EventPage key={item.key} event={item} />
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}
