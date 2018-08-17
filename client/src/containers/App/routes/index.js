import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// components public
import Signup from '../../Signup/Signup';
import Login from '../../Login/Login';
import Events from '../../Events/Events';
import ForgotPassword from '../../ForgotPassword/ForgotPassword';
import Organisation from '../../Organisation/Organisation';
import PrivateRoutes from './private.routes';
import EMNavbar from '../../../components/EMNavbar';
import CurrentEvent from '../../CurrentEvent/CurrentEvent';
import UserProfile from '../../UserProfile/UserProfile';

const BaseRedirection = () => <Redirect to="/events" />;

const Routes = () => (
  <div>
    <EMNavbar />
    <Switch>
      <Route exact path="/" component={BaseRedirection} />
      <Route exact path="/events" component={Events} />
      <Route path="/events/:event_id" component={CurrentEvent} />
      <Route path="/organisations/:organisation_id" component={Organisation} />
      <Route path="/users/:user_id" component={UserProfile} />
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/signup" component={Signup} />
      <PrivateRoutes />
      <Route component={BaseRedirection} />
    </Switch>
  </div>
);

export default Routes;
