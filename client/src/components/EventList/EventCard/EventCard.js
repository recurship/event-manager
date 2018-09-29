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
import moment from 'moment';
import { Link } from 'react-router-dom';

const DATE_FORMAT = 'LLLL';
const EventCard = props => {
  const card = props.event;
  return (
    <Col md="4" className="col-padding">
      <Card>
        <Link to={`/events/${props.event.id}`}>
          <CardImg
            top
            width="100%"
            src={card.cover}
            alt="Card image cap"
            height="180"
          />
        </Link>
        <CardBody>
          <CardTitle>{card.title}</CardTitle>
          <CardText>{card.description}</CardText>
          <CardSubtitle>
            <small className="text-muted">
              {moment(card.startDatetime).format(DATE_FORMAT)}
            </small>
          </CardSubtitle>
        </CardBody>
      </Card>
    </Col>
  );
};
export default EventCard;
