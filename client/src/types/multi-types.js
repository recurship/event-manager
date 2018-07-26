import { Action } from 'redux';

export type userStateType = {
  token: String,
  currentUser: Object,
};

export type userDataType = {
  userState: userStateType,
  dispatch: Action,
};
