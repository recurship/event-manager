import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const EventCard = props => {
  const card = props.event;
  return (
    <Col md="4" className="col-padding">
      <Card>
        <Link to={`/events/${props.event.id}/`}>
          <CardImg
            top
            width="100%"
            src={card.cover}
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
        </CardBody>
      </Card>
    </Col>
  );
};
export default EventCard;
