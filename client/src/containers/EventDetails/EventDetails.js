import React, { Component } from 'react';
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { fetchEventDetail } from '../../actions';

class EventDetails extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getEventDetail();
  }

  getEventDetail = () => {
    const eventId = this.props.match.params.value;
    const { dispatch } = this.props;
    dispatch(fetchEventDetail(eventId));
  };

  render() {
    const { event } = this.props.eventDetail;
    return (
      <div>
        {event ? (
          <Container>
            <Card>
              <CardImg
                top
                width="100%"
                src="https://orig00.deviantart.net/1d0a/f/2013/086/3/1/facebook_cover_panda_by_alphacid-d5zfsbp.jpg"
                alt="Card image cap"
              />
              <CardBody>
                <CardSubtitle>
                  <small className="text-muted">{event[0].startDateTime}</small>
                </CardSubtitle>
                <CardTitle>{event[0].title}</CardTitle>
                <CardText>{event[0].description}</CardText>
                <CardSubtitle>
                  <small className="text-muted">
                    {event[0].organisation.name}
                  </small>
                </CardSubtitle>
              </CardBody>
            </Card>
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
