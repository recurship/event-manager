
import AuthService from '../services/auth';
import EventService from '../services/events';
import { normalize } from 'normalizr';
import * as schema from '../schemas/eventSchema';
import * as humps from 'humps';


// app

export const TRIGGER_REQUEST = 'TRIGGER_REQUEST'
export const END_REQUEST = 'END_REQUEST'
export const TRIGGER_FAILURE = 'TRIGGER_FAILURE'

// current user
export const USER_LOGIN = 'USER_LOGIN'
export const USER_LOGOUT = 'USER_LOGOUT'

// events

export const FETCH_EVENTS = 'FETCH_EVENTS'

export const ADD_EVENT = 'ADD_EVENT';

// app actions

export const triggerRequest = name => ({
  type: TRIGGER_REQUEST,
  name
})

export const endRequest = name => ({
  type: END_REQUEST,
  name
})

export const triggerFailure = (name, error) => ({
  type: TRIGGER_FAILURE,
  name,
  error
})

// user actions

export const userLoginSuccess = token => ({
  type: USER_LOGIN,
  token
})

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT
})

export const userLogout = () => (dispatch, getState) => {
  dispatch(userLogoutSuccess())
}

export const userLogin = credentials => (dispatch, getState) => {
  dispatch(triggerRequest(USER_LOGIN))
  return AuthService.login(credentials.username, credentials.password)
    .then(token => {
      dispatch(userLoginSuccess(token.access))
      dispatch(endRequest(USER_LOGIN))
    })
    .catch(err => {
      dispatch(triggerFailure(USER_LOGIN, err))
    })
}

// event actions

export const getEvents = events => ({
  type: FETCH_EVENTS,
  events
})

export const addEvent = event => ({
  type: ADD_EVENT,
  event
})

export const fetchEvents = () => (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENTS))
  return EventService.getAll().then(response => {
    let camelCaseKeys = humps.camelizeKeys(response.results);
    dispatch(getEvents(normalize(camelCaseKeys, schema.eventsList)));
    dispatch(endRequest(FETCH_EVENTS))
  })
  .catch(err => {
    dispatch(triggerFailure(FETCH_EVENTS, err))
  })
}

export const postEvent = event => (dispatch, getState) => {
  dispatch(triggerRequest(ADD_EVENT))
  return EventService.add(event).then(event => {
    // dispatch(addEvent(event))
    // cant use ADD_EVENT here since we are using different serializers for read and write
    // in write mode the organisation object isnt returned. So we simply fetch all again
    dispatch(fetchEvents())
    dispatch(endRequest(ADD_EVENT))
  })
  .catch(err => {
    dispatch(triggerFailure(ADD_EVENT, err))
  })
}