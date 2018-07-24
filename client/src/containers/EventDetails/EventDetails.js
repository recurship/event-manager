import React, { Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Button,
} from 'reactstrap';
import SummaryContainer from '../../components/SummaryContainer/SummaryContainer';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../../actions';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import moment from 'moment';
import EventDescription from '../../components/EventDescription/EventDescription';

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getEventDetail();
  }

  getEventDetail = () => {
    const eventId = this.props.match.params.event_id;
    const { dispatch } = this.props;
    dispatch(fetchEventDetail(eventId));
  };

  render() {
    const { event } = this.props.eventDetail;
    return (
      <div className="main-container">
        {event ? (
          <Container>
            <CardImg top width="100%" src={event[0].cover} />
            <ContentHeader heading="Event Summary" />
            <Row className="block-content">
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                content={moment(event[0].startDatetime).format(
                  'DD/MM/YYYY HH:MM:SS'
                )}
              />
              <SummaryContainer
                iconName="fa fa-clock-o fa-2x"
                content={moment(event[0].endDatetime).format(
                  'DD/MM/YYYY HH:MM:SS'
                )}
              />
              <SummaryContainer
                iconName="fa fa-map-marker fa-2x"
                content={event[0].description}
              />
              <SummaryContainer
                iconName="fa fa-users fa-2x"
                content="Organization"
              />
            </Row>
            <EventDescription />
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
