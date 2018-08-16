// @flow
import React, { Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from 'reactstrap';
import MetaTagsComponent from '../../components/SocialShare/MetaTagsComponent';
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer';
import { connect } from 'react-redux';
import { fetchCurrentEvent } from '../../actions';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import moment from 'moment';
import DescriptionContainer from '../../components/DescriptionContainer/DescriptionContainer';
import { Link } from 'react-router-dom';
import { AttendeeType } from '../../types/attendee-types';
import './CurrentEvent.css';

const DATE_FORMAT = 'LLLL';

class CurrentEvent extends Component<Props> {
  eventId: string;
  componentDidMount() {
    this.getCurrentEvent();
  }

  getCurrentEvent = () => {
    const eventId = this.props.match.params.event_id;
    this.eventId = eventId;
    const { dispatch } = this.props;
    dispatch(fetchCurrentEvent(eventId));
  };

  getAttendeesProfiles = (attendees: Array<AttendeeType>) => {
    return (
      <Row>
        {attendees &&
          attendees.map(att => (
            <Col key={att.id}>
              <Link to={`/users/${att.id}`}>
                <Card id="attendee-card">
                  <CardImg
                    top
                    width="100%"
                    src={
                      att.avatar ||
                      'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
                    }
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
    let { event } = this.props.currentEvent;

    return (
      <div className="main-container">
        {event ? (
          <Container>
            <MetaTagsComponent
              title={event.title}
              description={event.description}
              image={event.cover}
              url={window.location.href}
            />
            <CardImg top width="100%" src={event.cover} />
            <ContentHeader heading="Event Summary" />
            <Row className="block-content">
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                url={null}
                content={moment(event.startDatetime).format(DATE_FORMAT)}
              />
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                url={null}
                content={moment(event.endDatetime).format(DATE_FORMAT)}
              />
              <SummaryContainer
                iconName="fa fa-map-marker fa-2x"
                url={null}
                content={event.location.address}
              />
              <SummaryContainer
                url={`/organisations/${event.organisation.id}/`}
                iconName="fa fa-users fa-2x"
                content={event.organisation.name}
              />
            </Row>
            <DescriptionContainer description={event.description} />
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
  const { currentEvent } = state;
  return { currentEvent };
};

export default connect(
  mapStateToProps,
  null
)(CurrentEvent);
