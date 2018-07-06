// @flow

import React, { Fragment } from 'react';
import { EMNavbar } from '../../components/EMNavbar';
import ListEvents from '../ListEvents';
import { Container } from 'reactstrap';
import { Route } from 'react-router-dom';

const AuthContainer = () => (
    <Fragment>
        <EMNavbar />
        <Container>
            <Route exact path="/" component={ListEvents}/>
        </Container>
    </Fragment>
);
 
export default AuthContainer;