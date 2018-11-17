import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import EditUserProfile from '../../EditProfile/EditUserProfile';
import CurrentEvent from '../../../containers/CurrentEvent/CurrentEvent';

const LoginRedirection = props => <Redirect to="/login" />;
//const EventRedirection = ()=> <Redirect to= /Events/

const PrivateRoutes = props => (
  <Fragment>
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
    <Route
      path="/events/:event_id"
      render={routeProps => (
        <div>
          {props.userState.token ? (
            <CurrentEvent {...routeProps} />
          ) : (
            <LoginRedirection />
          )}
        </div>
      )}
    />
  </Fragment>
);

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(PrivateRoutes);
