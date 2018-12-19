import * as React from 'react';
import { Action, Dispatch } from 'redux';

interface ComponenTypes {

}

export interface UserState {
  token?: string;
  currentUser: {
    id: string,
  };
}

export type BaseReducerPropsTypes = {
  appState?: Object,
  userState: UserState,
  events?: Object
};

export type BaseReduxPropTypes = {
  dispatch: (dispatch: any, getState?: any) => Promise<any>,
  component?: React.ComponentType<ComponenTypes>,
};
