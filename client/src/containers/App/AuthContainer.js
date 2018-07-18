// @flow

import React, { Fragment } from 'react';
import ListEvents from '../ListEvents';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

const AuthContainer = () => (
  <Fragment>
    <Route exact path="/" component={ListEvents} />
  </Fragment>
);

export default AuthContainer;
