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

import './EventCard.css';

const DATE_FORMAT = 'LLLL';
const EventCard = props => {
  const card = props.event;

  const startingDesc = card.description.slice(0, 35);
  const remainingDesc = card.description.slice(35, card.description.length);

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
          {startingDesc.length === 35 && (
            <input type="checkbox" class="read-more-state" id={card.id} />
          )}
          <CardText className="read-more-wrap">
            {startingDesc}
            {startingDesc.length === 35 && (
              <span className="dotspan">&nbsp;...</span>
            )}
            <span className="read-more-target">{remainingDesc}</span>
          </CardText>
          <label htmlFor={card.id} className="read-more-trigger" />
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
