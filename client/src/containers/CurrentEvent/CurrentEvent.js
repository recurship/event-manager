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
import MetaTags from 'react-meta-tags';
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer';
import { connect } from 'react-redux';
import { fetchCurrentEvent } from '../../actions';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import moment from 'moment';
import EventDescription from '../../components/EventDescription/EventDescription';
import EditProfileModal from '../EditProfile/EditProfileModal';
import { Link } from 'react-router-dom';
import { AttendeeType } from '../../types/attendee-types';
import './CurrentEvent.css';
class CurrentEvent extends Component {
  eventId: string;

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getCurrentEvent();
  }

  getCurrentEvent = () => {
    const eventId = this.props.match.params.event_id;
    this.eventId = eventId;
    const { dispatch } = this.props;
    dispatch(fetchCurrentEvent(eventId));
	};
	
	editUser = (e, user) => {
		e.preventDefault();
		this.editModal.toggle();
		this.editModal.receiveUserDetails(user)
	}

  getAttendeesProfiles = (attendees: Array<AttendeeType>) => {
    return (
      <Row>
        {attendees &&
          attendees.map(att => (
            <Col key={att.id}>
              <Link to={`/events/${this.eventId}/attendee/${att.id}`}>
								<Button id="edit-user" className="btn btn-default"
									onClick={e => this.editUser(e, att)}>
									<span className="fa fa-edit"></span>
								</Button>
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
            <MetaTags>
              <title>{event.title}</title>
              <meta name="description" content={event.description} />
              <meta property="og:title" content={event.title} />
              <meta
                property="og:image"
                content={
                  event.cover
                    ? event.cover
                    : 'http://via.placeholder.com/350x150'
                }
              />
              <meta property="og:url" content={window.location.href} />
            </MetaTags>
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
  const { currentEvent } = state;
  return { currentEvent };
};

export default connect(
  mapStateToProps,
  null
)(CurrentEvent);
