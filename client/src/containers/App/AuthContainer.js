// @flow

import React, { Fragment } from 'react';
import Events from '../Events/Events';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

const AuthContainer = () => (
  <Fragment>
    <Route exact path="/" component={Events} />
  </Fragment>
);

export default AuthContainer;
