// @flow

import React, { Component } from 'react';
import { Row, Col, Jumbotron, Button } from 'reactstrap';
import { userLogin, fetchEvents, postEvent, userLogout } from '../actions';
import { Action } from 'redux';
import type { BaseReduxPropTypes } from '../types/base-props-types';
import { connect } from 'react-redux';
import { EventList } from '../components/EventList/EventList';

type Props = BaseReduxPropTypes & {
  userState: Object,
  appState: Object,
  events: Object,
};
const eventsDummy = [
  {
    key: '1',
    title: 'Road to Angular',
    location: 'Karachi',
    startDateTime: '14-July-2018',
    endDateTime: '21-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: 'ngGirls',
  },
  {
    key: '2',
    title: 'Google I/O',
    location: 'Lahore',
    startDateTime: '28-July-2018',
    endDateTime: '29-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: 'GDG Kolachi',
  },
  {
    key: '3',
    title: 'Road to JavaScript',
    location: 'Islamabad',
    startDateTime: '14-July-2018',
    endDateTime: '21-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: 'ngGirls',
  },
  {
    key: '4',
    title: 'Google Devfest',
    location: 'Italy',
    startDateTime: '28-July-2018',
    endDateTime: '29-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: 'GDG Kolachi',
  },
  {
    key: '5',
    title: 'Node School Workshop',
    location: 'Malaysia',
    startDateTime: '28-July-2018',
    endDateTime: '29-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: 'NodeSchool Karachi Chapter',
  },
  {
    key: '6',
    title: 'WomenTechQuest',
    location: 'Singapore',
    startDateTime: '28-July-2018',
    endDateTime: '29-July-2018',
    imageurl: 'https://cdn-images-1.medium.com/max/800/0*PkFv7ExBsCL5xrHA.',
    organisation: '10 Pearls',
  },
];

class ListEvents extends Component<Props> {
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { dispatch } = this.props;
    dispatch(userLogin({ username: 'admin', password: '1299459ML' }));
    dispatch(fetchEvents());
  };

  logout = () => {
    const { dispatch } = this.props;
    dispatch(userLogout());
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
    const { appState, userState, events } = this.props;
    return (
      <div>
        <EventList events={eventsDummy} />
        {userState.token ? (
          <Button tag="a" color="success" size="large" onClick={this.logout}>
            Logout
          </Button>
        ) : (
          ''
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // const { appState, userState, events } = state;
  return state;
};

export default connect(mapStateToProps)(ListEvents);
