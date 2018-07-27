import { Action } from 'redux';

export type UserState = {
  token: string,
};

export type User = {
  userState: UserState,
  dispatch: Action,
};

export type Location = {
  hash: string,
  key: string,
  pathname: string,
  search: string,
  state: {
    from: Location,
  },
};
