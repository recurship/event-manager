// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserState from '../types/multi-types';
import type {
  BaseReducerPropsTypes,
  BaseReduxPropTypes,
} from '../types/base-props-types';
import { Route, Redirect } from 'react-router-dom';
type Props = BaseReduxPropTypes & {
  userState: UserState,
  appState: Object,
  events: Object,
};
class PublicRoute extends Component<Props> {
  render() {
    const { userState, component: Component, ...rest } = this.props;
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(PublicRoute);
