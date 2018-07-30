// @flow

import React, { Fragment, Component } from 'react';
import Events from '../Events/Events';
import { EMNavbar } from '../../components/EMNavbar';
import type { BaseReduxPropTypes } from '../../types/base-props-types';
import { Container } from 'reactstrap';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import CurrentEvent from '../CurrentEvent/CurrentEvent';
import Organisation from '../Organisation/Organisation';
import { connect } from 'react-redux';
import Location from '../../types/multi-types';

type Props = {
  location: Location,
};

class PublicContainer extends Component<Props> {
  render() {
    const { pathname } = this.props.location;
    return (
      <Router>
        <Fragment>
          {pathname == '/login' ||
          pathname == '/signup' ||
          pathname == '/forgot-password' ||
          pathname == '/' ? null : (
            <Route render={() => <EMNavbar userData={this.props} />} />
          )}
          <Route exact component={Events} path="/events" />
          <Route
            exact
            render={props => (
              <div>
                <CurrentEvent {...props} />
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
