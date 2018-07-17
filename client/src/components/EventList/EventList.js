import React, { Component } from 'react';
import { EventPage } from './EventPage/EventPage';
import { Jumbotron, Container, Row, Col } from 'reactstrap';
import { SubHeader } from './SubHeader/SubHeader';

export class EventList extends Component {
  render() {
    const eventArray = this.props.events;
    return (
      <Container>
        <Jumbotron>
          <h3 className="text-center">Welcome to Event Management</h3>
          <h6 className="text-center">Portal for Open Source Communities</h6>
        </Jumbotron>
        <Container>
          <SubHeader />
        </Container>
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
