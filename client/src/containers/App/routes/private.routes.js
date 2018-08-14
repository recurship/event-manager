import React, { Fragment, Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import CurrentEvent from '../../CurrentEvent/CurrentEvent';
import Organisation from '../../Organisation/Organisation';
import UserProfile from '../../UserProfile/UserProfile';
import EditUserProfile from '../../EditProfile/EditUserProfile';

const BaseRedirection = () => <Redirect to="/events" />;

const LoginRedirection = () => <Redirect to="/login" />;

const PrivateRoutes = props => (
  <Fragment>
    <Switch>
      <Route
        render={routesProps => (
          <div>
            {props.userState.token ? (
              <CurrentEvent {...routesProps} />
            ) : (
              <LoginRedirection />
            )}
          </div>
        )}
        path="/events/:event_id"
      />
      <Route
        render={routesProps => (
          <div>
            {props.userState.token ? (
              <Organisation {...routesProps} />
            ) : (
              <LoginRedirection />
            )}
          </div>
        )}
        path="/organisations/:organisation_id"
      />
      <Route
        path="/users/:user_id"
        render={routesProps => (
          <div>
            {props.userState.token ? (
              <UserProfile {...routesProps} />
            ) : (
              <LoginRedirection />
            )}
          </div>
        )}
      />
      <Route
        path="/users/:user_id/edit"
        render={routesProps => (
          <div>
            {props.userState.token ? (
              <EditUserProfile {...routesProps} />
            ) : (
              <LoginRedirection />
            )}
          </div>
        )}
      />
      <Route component={BaseRedirection} />
    </Switch>
  </Fragment>
);

const mapStateToProps = state => {
  // const { appState, userState, events } = state;
  return state;
};

export default connect(mapStateToProps)(PrivateRoutes);
