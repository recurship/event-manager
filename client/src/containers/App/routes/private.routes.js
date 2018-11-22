import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//components
import EditUserProfile from '../../EditProfile/EditUserProfile';

const LoginRedirection = props => (
  <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
);

const PrivateRoutes = props => (
  <Fragment>
    <Route
      path="/users/:user_id/edit"
      render={routesProps => (
        <div>
          {props.userState.token ? (
            <EditUserProfile {...routesProps} />
          ) : (
            <LoginRedirection {...routesProps} />
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
