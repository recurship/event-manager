import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

//components
import Signup from '../../Signup/Signup';
import Login from '../../Login/Login';
import Events from '../../Events/Events';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';

const BaseRedirection = () => <Redirect to="/events" />;

const PublicRoutes = () => (
  <Switch>
    <Route exact path="/" component={BaseRedirection} />
    <Route exact path="/events" component={Events} />
    <Route path="/login" component={Login} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/signup" component={Signup} />
    <Route component={BaseRedirection} />
  </Switch>
);

export default PublicRoutes;
