import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// private routes
import PrivateRoutes from './private.routes';

// components public
import EMNavbar from '../../../components/EMNavbar';
const BaseRedirection = () => <Redirect to="/events" />;
const Events = lazy(() => import('../../Events/Events'));
const CurrentEvent = lazy(() => import('../../CurrentEvent/CurrentEvent'));
const Organisation = lazy(() => import('../../Organisation/Organisation'));
const UserProfile = lazy(() => import('../../UserProfile/UserProfile'));
const Login = lazy(() => import('../../Login/Login'));
const Signup = lazy(() => import('../../Signup/Signup'));
const ForgotPassword = lazy(() =>
  import('../../ForgotPassword/ForgotPassword')
);

const Routes = () => (
  <div>
    <EMNavbar />
    <Switch>
      <Route
        exact
        path="/"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <BaseRedirection {...props} />
          </Suspense>
        )}
      />
      <Route
        exact
        path="/events"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <Events {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/events/:event_id"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <CurrentEvent {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/organisations/:organisation_id"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <Organisation {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/users/:user_id"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <UserProfile {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/login"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <Login {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/forgot-password"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <ForgotPassword {...props} />
          </Suspense>
        )}
      />
      <Route
        path="/signup"
        render={props => (
          <Suspense fallback={<div>loading...</div>}>
            <Signup {...props} />
          </Suspense>
        )}
      />
      <PrivateRoutes />
      <Route component={BaseRedirection} />
    </Switch>
  </div>
);

export default Routes;
