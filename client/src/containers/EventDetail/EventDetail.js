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
import { fetchEventDetail } from '../../actions';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import moment from 'moment';
import DescriptionContainer from '../../components/DescriptionContainer/DescriptionContainer';
import { Link } from 'react-router-dom';
import { AttendeeType } from '../../types/attendee-types';
import './EventDetail.css';
import GoogleMap from '../../components/GoogleMap/GoogleMap';
import CommentsBlock from '../../components/Comments/CommentsBlock';

const DATE_FORMAT = 'LLLL';

class EventDetail extends Component<Props> {
  eventId;
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
    const { event } = this.props.eventDetail;

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
            <Row className="block-content">
              <CardImg top width="100%" src={event.cover} />
            </Row>
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
                logo={event.organisation.logo}
              />
            </Row>
            <ContentHeader heading="Sponsers" />
            <Row className="block-content">
              {event.sponsers.map((sponser, index) => (
                <SummaryContainer
                  key={index}
                  iconName="fa fa-clock-o fa-2x"
                  url={null}
                  logo={sponser.logo}
                  content={sponser.name}
                />
              ))}
            </Row>
            <DescriptionContainer description={event.description} />

            {event.attendees && event.attendees.length ? (
              <div>
                <ContentHeader heading="Attendees" />
                <Row className="block-content">
                  {this.getAttendeesProfiles(event.attendees)}
                </Row>
              </div>
            ) : null}

            {event.location.coordinates ? (
              <GoogleMap location={event.location} />
            ) : null}
            {event.tags ? (
              <Row className="block-content">
                {event.tags.map(tag => (
                  <label
                    className="tag text-dark font-weight-light"
                    key={tag.id}
                  >
                    <small>{tag.name}</small>
                  </label>
                ))}
              </Row>
            ) : null}

            <ContentHeader heading="Organiser Detail" />
            <Row className="block-content">
              <SummaryContainer
                iconName="fa fa-envelope fa-2x"
                url={null}
                content={event.organisation.email}
              />
              <SummaryContainer
                iconName="fa fa-phone-square fa-2x"
                url={null}
                content={event.organisation.contactNumber}
              />
              <SummaryContainer
                iconName="fa fa-facebook-square fa-2x"
                url={event.organisation.facebook}
                content={event.organisation.facebook}
                externalLink={true}
              />
              <SummaryContainer
                iconName="fa fa-twitter-square fa-2x"
                url={event.organisation.twitter}
                content={event.organisation.twitter}
                externalLink={true}
              />
            </Row>
            <Row className="block-content">
              <CommentsBlock event={event} eventID={event.id} />
            </Row>
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
)(EventDetail);
