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

class EventDetails extends Component {
  constructor(props) {
    super(props);
    this.state = { event: {} };
  }

  componentDidMount() {
    const eventId = this.props.match.params.value;
    const event = this.props.events.events.find(event => event.id == eventId);
    this.setState({ event: event });
  }

  render() {
    return (
      <div>
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
                <small className="text-muted">
                  {this.state.event.startDateTime}
                </small>
              </CardSubtitle>
              <CardTitle>{this.state.event.title}</CardTitle>
              <CardText>{this.state.event.description}</CardText>
              <CardSubtitle>
                {/* <small className="text-muted">{this.state.event.organisation.name}</small> */}
              </CardSubtitle>
            </CardBody>
          </Card>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userState, events } = state;
  return { userState, events };
};

export default connect(
  mapStateToProps,
  null
)(EventDetails);
