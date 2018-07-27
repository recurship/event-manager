// @flow
import React, { Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
  Button,
} from 'reactstrap';
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../../actions';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import moment from 'moment';
import EventDescription from '../../components/EventDescription/EventDescription';
import { Link } from 'react-router-dom';
import './EventDetails.css';
import { AttendeeType } from '../../types/attendee-types';
class EventDetails extends Component {
  eventId: string;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getEventDetail();
  }

  getEventDetail = () => {
    const eventId = this.props.match.params.event_id;
    this.eventId = eventId;
    const { dispatch } = this.props;
    dispatch(fetchEventDetail(eventId));
  };

  getAttendeesProfiles = (attendees: Array<AttendeeType>) => {
    return (
      <Row>
        {attendees &&
          attendees.map(att => (
            <Col key={att.id}>
              <Link to={`/event/${this.eventId}/attendee/${att.}`}>
                <Card id="attendee-card">
                  <CardImg
                    top
                    width="100%"
                    src={att.avatar || "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"}
                    alt="Card image cap"
                  />
                  <CardBody>
                    <CardTitle>{att.username}</CardTitle>
                    <CardSubtitle>{att.email}</CardSubtitle>
                  </CardBody>
                </Card>
              </Link>
            </Col>
          ))}
      </Row>
    );
  };

  render() {
    let { event } = this.props.eventDetail;

    return (
      <div className="main-container">
        {event ? (
          <Container>
            <CardImg top width="100%" src={event.cover} />
            <ContentHeader heading="Event Summary" />
            <Row className="block-content">
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                content={moment(event.startDatetime).format(
                  'DD/MM/YYYY HH:MM:SS'
                )}
              />
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                content={moment(event.endDatetime).format(
                  'DD/MM/YYYY HH:MM:SS'
                )}
              />
              <SummaryContainer
                iconName="fa fa-map-marker fa-2x"
                content={event.description}
              />
              <SummaryContainer
                iconName="fa fa-users fa-2x"
                content="Organization"
              />
            </Row>
            <EventDescription />
            <div>
              {event.attendees && event.attendees.length
                ? this.getAttendeesProfiles(event.attendees)
                : null}
            </div>
          </Container>
        ) : (
          <Container />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { eventDetail } = state;
  return { eventDetail };
};

export default connect(
  mapStateToProps,
  null
)(EventDetails);
