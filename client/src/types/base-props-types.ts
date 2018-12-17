import * as React from 'react';
import { Action } from 'redux';

interface ComponenTypes {

}

export type BasePropsTypes = {};

export type BaseReducerPropsTypes = BasePropsTypes & {
  // appState?: Object,
  // userState?: Object,
  // events?: Object
};

export type BaseReduxPropTypes = BasePropsTypes & {
  dispatch: (action: Action) => any,
  component?: React.ComponentType<ComponenTypes>,
};
