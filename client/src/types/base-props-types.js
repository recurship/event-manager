// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import { Action } from 'redux';

export type BasePropsTypes = {};

export type BaseReducerPropsTypes = BasePropsTypes & {
  // appState?: Object,
  // userState?: Object,
  // events?: Object
};

export type BaseReduxPropTypes = BasePropsTypes & {
  dispatch: (action: Action) => mixed,
  component?: React.ComponentType<PropTypes>,
};
