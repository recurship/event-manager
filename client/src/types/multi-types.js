import { Action } from 'redux';

export type UserState = {
  token: string,
};

export type AppState = {
  loading: Array<string>,
  errors: Array<string>,
};

type Owner = {
  id: number,
  username: string,
  firstName: string,
  lastName: string,
  enableNotifications: boolean,
  email: string,
  avatar: string,
};

type Organisation = {
  id: number,
  name: string,
  isActive: boolean,
  description: string,
  logo: string,
  owner: Owner,
};

type location = {
  id: number,
  name: string,
  address: string,
  logo: string,
};

type sponsor = {
  id: number,
  name: string,
  logo: string,
};

type Event = {
  id: number,
  title: string,
  description: string,
  startDateTime: string,
  endDateTime: string,
  organisation: Organisation,
  location: location,
  sponsor: Array<sponsor>,
};

export type Events = {
  events: Array<Event>,
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
