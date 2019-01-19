import { Action } from 'redux';
import { Children } from 'react';
import { LocationType } from './location-types';
import { OrganisationType } from './organisation-types'

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

export type MapLocation = {
  name: string,
  address?: string,
  coordinates: Object
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
  organisation: OrganisationType,
  location: LocationType,
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