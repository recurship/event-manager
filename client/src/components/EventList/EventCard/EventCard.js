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

const DATE_FORMAT = 'LL';
const TIME_FORMAT = 'HH.A';
const EventCard = props => {
  const card = props.event;
  return (
    <Col className="cardFormating col-padding">
      <Link to={`/events/${props.event.id}`}>
        <Card className="bgGradient">
          <CardImg
            top
            width="100%"
            src={card.cover}
            alt="Card image cap"
            height="180"
            className="mx-auto pt-3 cardFormating"
          />
          <CardBody className="mx-auto cardFormating my-3 bg-white">
            <CardTitle>{card.title}</CardTitle>
            <span className="text-muted ">
              {moment(card.startDatetime).format(TIME_FORMAT)}
            </span>{' '}
            - &nbsp;
            <span className="text-muted">
              {moment(card.endDatetime).format(TIME_FORMAT)}
            </span>
            <CardText>{card.description}</CardText>
            <CardSubtitle>
              <small className="text-muted">
                {moment(card.startDatetime).format(DATE_FORMAT)}
              </small>
            </CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
};
export default EventCard;
