// @flow

import React, { Fragment, Component } from 'react';
import Events from '../Events/Events';
import { EMNavbar } from '../../components/EMNavbar';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {};

class AuthContainer extends Component<Props> {
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
          path="/"
        />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return state;
};

export default connect(mapStateToProps)(AuthContainer);
