// @flow

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Login from '../Login/Login';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import AuthContainer from './AuthContainer';
import Signup from '../Signup/Signup';
import Events from '../Events/Events';
import PrivateRoute from '../../components/PrivateRoute';
import { EventDetails } from '../EventDetails/EventDetails';

type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={AuthContainer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/events" component={Events} />
        <Route path="/details" component={EventDetails} />
      </div>
    );
  }
}

export default App;
