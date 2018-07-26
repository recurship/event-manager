// @flow

import React, { Fragment, Component } from 'react';
import Events from '../Events/Events';
import { EMNavbar } from '../../components/EMNavbar';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { Container } from 'reactstrap';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import EventDetails from '../EventDetails/EventDetails';
import Organisation from '../Organisation/Organisation';
import { connect } from 'react-redux';

type Props = {
  location: Object,
};

class PublicContainer extends Component<Props> {
  render() {
    const { pathname } = this.props.location;
    return (
      <Router>
        <Fragment>
          {pathname == '/login' ||
          pathname == '/signup' ||
          pathname == '/forgot-password' ? null : (
            <Route render={() => <EMNavbar userData={this.props} />} />
          )}
          <Route exact component={Events} path="/events" />
          <Route
            exact
            render={props => (
              <div>
                <EventDetails {...props} />
              </div>
            )}
            path="/events/:event_id"
          />
          <Route
            exact
            render={props => (
              <div>
                <Organisation {...props} />
              </div>
            )}
            path="/organisations/:organisation_id"
          />
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps)(PublicContainer);
