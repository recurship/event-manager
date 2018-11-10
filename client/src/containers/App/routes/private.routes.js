import React, { lazy, Suspence, Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//components
// import EditUserProfile from '../../EditProfile/EditUserProfile';

const EditUserProfile = lazy(import('../../EditProfile/EditUserProfile'));

const LoginRedirection = () => <Redirect to="/login" />;

const PrivateRoutes = props => (
  <Fragment>
    <Route
      path="/users/:user_id/edit"
      render={routesProps => (
        <div>
          {props.userState.token ? (
            <Suspence fallback={<div>loading...</div>}>
              <EditUserProfile {...routesProps} />
            </Suspence>
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
