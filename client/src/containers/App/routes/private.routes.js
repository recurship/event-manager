import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

//components
import EditUserProfile from '../../EditProfile/EditUserProfile';

const LoginRedirection = props => (
  <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
);

LoginRedirection.propTypes = {
  location: PropTypes.object,
};

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
