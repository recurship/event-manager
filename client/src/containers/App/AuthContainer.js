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
        <EMNavbar userData={this.props} />
        <Route exact component={Events} path="/" />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { userState } = state;
  return { userState };
};

export default connect(mapStateToProps)(AuthContainer);
