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
// import injectSheet from 'react-jss';

// const styles = {
//   bgGradient: {
//     background:{
//       color: 'black',
//     }
//   },
// };

// const DATE_FORMAT = 'LL';
const TIME_FORMAT = 'HH.A';
// const DATE_FORMAT = 'LL';
const MONTH = 'MMM';
const DAY = 'DD';

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
          <CardBody className="mx-auto text-justify cardFormating my-3 bg-white">
            <CardSubtitle>
              <small className="float-right mr-2 text-muted">
                <span className="date">
                  {moment(card.startDatetime).format(DAY)}
                </span>
                <br />
                <span className="month">
                  {moment(card.startDatetime).format(MONTH)}
                </span>
              </small>
            </CardSubtitle>
            <CardTitle>{card.title} </CardTitle>
            <span className="text-muted mr-2">
              {moment(card.startDatetime).format(TIME_FORMAT)}
            </span>
            - &nbsp;
            <span className="text-muted">
              {moment(card.endDatetime).format(TIME_FORMAT)}
            </span>
            <CardText>{card.description}</CardText>
            <CardSubtitle>
              <span className="text-muted">
                <i className="fas fa-map-marker-alt mr-1" />
                {card.location.address}
              </span>
            </CardSubtitle>
          </CardBody>
        </Card>
      </Link>
    </Col>
  );
};

// const StyledCard = injectSheet(styles)(EventCard);
// const App = () => <StyledCard />;

// render(<App />, document.getElementById('root'));

export default EventCard;

// export function generateColors() {
//   const letters = 'BCDEF'.split('');
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * letters.length)];
//   }

//   return color;
// }
