// @flow

import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button, Container } from 'reactstrap';
import SubHeader from '../../components/EventList/SubHeader/SubHeader';
import { userLogin, fetchEvents, postEvent } from '../../actions';
import { Action } from 'redux';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { connect } from 'react-redux';
import { EventList } from '../../components/EventList/EventList';
import { EMNavbar } from '../../components/EMNavbar';

type Props = BaseReduxPropTypes & {
  userState: Object,
  events: Object,
};

class Events extends Component<Props> {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    dispatch(fetchEvents());
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
          <SubHeader />
        </Container>
        {events.events.length ? (
          <EventList events={events.events} />
        ) : (
          <Container>
            <h4 className="text-center">Not Any Event Yet</h4>
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
