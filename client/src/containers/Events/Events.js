// @flow

import React, { Component } from 'react';
import { Row, Col, Jumbotron, Container } from 'reactstrap';
import { fetchEvents, postEvent } from '../../actions';
import { makeQueryStringTransformable } from '../../utils/utils';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import { EventList } from '../../components/EventList/EventList';
import DropSearch, {
  State as DropSearchState,
} from '../../components/DropSearch/DropSearch';
import EventCard from '../../components/EventList/EventCard/EventCard';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
const mainTitle = 'Portal for Tech Communities';
const eventNotFound = 'No events found.';

type Props = BaseReduxPropTypes & {
  userState: Object,
  events: Object,
};

class Events extends Component<Props> {
  componentDidMount() {
    this.getData();
  }
  // getSortyByOptions = () => {
  //   return [
  //     {
  //       label: 'Start Date',
  //       value: 'startDate',
  //     },
  //     {
  //       label: 'Organisation',
  //       value: 'organisation',
  //     },
  //     {
  //       label: 'Sponsors',
  //       value: 'sponsers',
  //     },
  //     {
  //       label: 'Location',
  //       value: 'location',
  //     },
  //     {
  //       label: 'Tags',
  //       value: 'tags',
  //     },
  //     {
  //       label: 'Time',
  //       value: 'time',
  //     },
  //   ];
  // };

  // handleSearchChange = (searchParams: DropSearchState) => {
  //   if (searchParams) searchParams = makeQueryStringTransformable(searchParams);
  //   this.getData(searchParams);
  // };

  getData = e => {
    const { dispatch } = this.props;
    dispatch(fetchEvents(e));
  };

  // handleSubmit = (event: any) => {
  //   event.preventDefault();

  //   const {
  //     title,
  //     description,
  //     startDateTime,
  //     endDateTime,
  //     organisation,
  //   } = event.nativeEvent.target.elements;

  //   this.props.dispatch(
  //     postEvent({
  //       title: title.value,
  //       description: description.value,
  //       startDateTime: startDateTime.value,
  //       endDateTime: endDateTime.value,
  //       organisation: organisation.value,
  //     })
  //   );
  // };

  render() {
    const { events } = this.props;
    return (
      <div>
        <Col className="cardFormating mx-auto py-5 mt-4 bg-dark">
          <Container>
            <Row>
              <Col md="20" className="mx-auto mt-3">
                {events.events.length ? (
                  <EventList events={events.events} />
                ) : (
                  <Container>
                    <h4 className="text-center">{eventNotFound}</h4>
                  </Container>
                )}
              </Col>
            </Row>
          </Container>
        </Col>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps,
  null
)(Events);
