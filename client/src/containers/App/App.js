// @flow

import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';

import Login from '../Login/Login';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import AuthContainer from './AuthContainer';
import PublicContainer from './PublicContainer';
import Signup from '../Signup/Signup';
import Events from '../Events/Events';
import PrivateRoute from '../../components/PrivateRoute';
import PublicRoute from '../../components/PublicRoute';
import CurrentEvent from '../CurrentEvent/CurrentEvent';
import Organisation from '../Organisation/Organisation';
import UserProfile from '../UserProfile/UserProfile';
type Props = {};

class App extends Component<Props> {
  render() {
    return (
      <div>
        <PrivateRoute exact path="/" component={AuthContainer} />
        <PublicRoute path="/" component={PublicContainer} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/forgot-password" component={ForgotPassword} />
      </div>
    );
  }
}

export default App;
