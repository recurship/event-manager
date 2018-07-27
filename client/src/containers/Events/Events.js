// @flow

import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Container } from 'reactstrap';
import SubHeader from '../../components/EventList/SubHeader/SubHeader';
import { userLogin, fetchEvents, postEvent, userLogout } from '../../actions';
import { makeQueryStringTransformable } from '../../utils/utils';
import { Action } from 'redux';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import { EventList } from '../../components/EventList/EventList';
import { EMNavbar } from '../../components/EMNavbar';
import DropSearch, {
  State as DropSearchState,
} from '../../components/DropSearch/DropSearch';

type Props = BaseReduxPropTypes & {
  userState: Object,
  events: Object,
};

class Events extends Component<Props> {
  componentDidMount() {
    this.getData();
  }
  getSortyByOptions = () => {
    return [
      {
        label: 'Start Date',
        value: 'startDate',
      },
      {
        label: 'Organisation',
        value: 'organisation',
      },
      {
        label: 'Sponsor',
        value: 'sponser',
      },
      {
        label: 'Location',
        value: 'location',
      },
    ];
  };

  handleSearchChange = (searchParams: DropSearchState) => {
    if (searchParams) searchParams = makeQueryStringTransformable(searchParams);
    this.getData(searchParams);
  };

  getData = e => {
    const { dispatch } = this.props;
    dispatch(fetchEvents(e));
  };

  handleSubmit = (event: any) => {
    event.preventDefault();

    const {
      title,
      description,
      startDateTime,
      endDateTime,
      organisation,
    } = event.nativeEvent.target.elements;

    this.props.dispatch(
      postEvent({
        title: title.value,
        description: description.value,
        startDateTime: startDateTime.value,
        endDateTime: endDateTime.value,
        organisation: organisation.value,
      })
    );
  };

  render() {
    const { userState, events } = this.props;
    return (
      <div>
        <Jumbotron>
          <h3 className="text-center">Welcome to Event Management</h3>
          <h6 className="text-center">Portal for Open Source Communities</h6>
        </Jumbotron>
        <Container>
          <Row>
            <Col md="12">
              <DropSearch
                sortBy={this.getSortyByOptions()}
                handleSearchChange={this.handleSearchChange}
                events={events}
              />
            </Col>
          </Row>
        </Container>
        {events.events.length ? (
          <EventList events={events.events} />
        ) : (
          <Container>
            <h4 className="text-center">No events found.</h4>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { userState, events } = state;
  return state;
};

export default connect(mapStateToProps)(Events);
