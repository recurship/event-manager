import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { Link } from 'react-router-dom';

export class EventCard extends Component {
  render() {
    const card = this.props.event;
    return (
      <div>
        <Card>
          <Link to="/details">
            <CardImg
              top
              width="100%"
              src={card.imageurl}
              alt="Card image cap"
              height="180"
            />
          </Link>
          <CardBody>
            <CardSubtitle>
              <small className="text-muted">{card.startDateTime}</small>
            </CardSubtitle>
            <CardTitle>{card.title}</CardTitle>
            <CardText>{card.description}</CardText>
            <CardSubtitle>
              <small className="text-muted">card.organisation</small>
            </CardSubtitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}
