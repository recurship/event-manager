// @flow

import React, { Fragment } from 'react';
import Events from '../Events/Events';
import { EMNavbar } from '../../components/EMNavbar';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

const AuthContainer = () => (
  <Fragment>
    <EMNavbar />
    <Container>
      <Route exact path="/" component={Events} />
    </Container>
  </Fragment>
);

export default AuthContainer;
