// @flow

import React, { Fragment, Component } from 'react';
import Events from '../Events/Events';
import { EMNavbar } from '../../components/EMNavbar';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';
import EventDetails from '../EventDetails/EventDetails';
import Organisation from '../Organisation/Organisation';
import { connect } from 'react-redux';

type Props = {};

class PublicContainer extends Component<Props> {
  render() {
    return (
      <Fragment>
        <Route
          exact
          render={() => (
            <div>
              <EMNavbar userData={this.props} /> <Events />
            </div>
          )}
          path="/events"
        />
        <Route
          exact
          render={props => (
            <div>
              <EMNavbar userData={this.props} /> <EventDetails {...props} />
            </div>
          )}
          path="/events/:event_id"
        />
        <Route
          exact
          render={props => (
            <div>
              <EMNavbar userData={this.props} /> <Organisation {...props} />
            </div>
          )}
          path="/organisations/:organisation_id"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return state;
};

export default connect(mapStateToProps)(PublicContainer);
