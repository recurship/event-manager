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
      <div className="main-container">
        {event ? (
          <Container>
            <CardImg top width="100%" src={event[0].cover} />
            <Row className="block">
              <Col className="text-header">
                <h4>Event Summary</h4>
              </Col>
            </Row>
            <Row className="block-content">
              <SummaryContainer iconName="1" content={event[0].startDatetime} />
              <SummaryContainer iconName="2" content={event[0].endDatetime} />
              <SummaryContainer iconName="3" content={event[0].description} />
              <SummaryContainer
                iconName="4"
                content={event[0].organisation.name}
              />
            </Row>
            <Row className="block">
              <Col className="text-header">
                <h4>Event Description</h4>
              </Col>
            </Row>
            <Row className="block-content text-justify">
              <Col md="9">
                This HTML file is a template. If you open it directly in the
                browser, you will see an empty page. You can add webfonts, meta
                tags, or analytics to this file. The build step will place the
                bundled scripts into the tag. To begin the development, run `npm
                start` or `yarn start`. To create a production bundle, use `npm
                run build` or `yarn build`.
              </Col>
              <Col md="3">
                <center>
                  <h6>Organiser Contact</h6>
                  <Button className="bg-success">Register here</Button>
                </center>
              </Col>
            </Row>
          </Container>
        ) : (
          // <Container>
          //   <Card>
          //     <CardImg
          //       top
          //       width="100%"
          //       src={event[0].cover}
          //       alt="Card image cap"
          //     />
          //     <Container>
          //       <Row>
          //         <Col md="8">
          //           <CardBody>
          //             <CardSubtitle>
          //               <small className="text-muted">
          //                 {event[0].startDateTime}
          //               </small>
          //             </CardSubtitle>
          //             <CardTitle>{event[0].title}</CardTitle>
          //             <CardText>{event[0].description}</CardText>
          //             <CardSubtitle>
          //               <small className="text-muted">
          //                 {event[0].organisation.name}
          //               </small>
          //             </CardSubtitle>
          //           </CardBody>
          //         </Col>
          //         <Col md="4">
          //           <CardBody>
          //             <CardImg
          //               top
          //               width="100%"
          //               src={event[0].organisation.logo}
          //               alt="Card image cap"
          //             />

          //             <CardTitle>{event[0].organisation.name}</CardTitle>
          //             <CardSubtitle>
          //               <small className="text-muted">
          //                 {event[0].organisation.name}
          //               </small>
          //             </CardSubtitle>
          //           </CardBody>
          //         </Col>
          //       </Row>
          //     </Container>
          //   </Card>
          // </Container>
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
