import AuthService from '../services/auth';
import EventService from '../services/events';
import { normalize } from 'normalizr';
import * as schema from '../schemas/eventSchema';
import * as humps from 'humps';
// app

export const TRIGGER_REQUEST = 'TRIGGER_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const TRIGGER_FAILURE = 'TRIGGER_FAILURE';

// current user
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
// events

export const FETCH_EVENTS = 'FETCH_EVENTS';

export const ADD_EVENT = 'ADD_EVENT';

// app actions

export const triggerRequest = name => ({
  type: TRIGGER_REQUEST,
  name,
});

export const endRequest = name => ({
  type: END_REQUEST,
  name,
});

export const triggerFailure = (name, error) => ({
  type: TRIGGER_FAILURE,
  name,
  error,
});

// user actions

export const userLoginSuccess = token => ({
  type: USER_LOGIN,
  token,
});

export const userLogoutSuccess = () => ({
  type: USER_LOGOUT,
});

export const userSignupSuccess = token => ({
  type: USER_SIGNUP,
  token,
});

export const resetPasswordSuccess = message => ({
  type: RESET_PASSWORD,
  message,
});
export const refreshToken = payload => ({
  type: REFRESH_TOKEN,
  payload,
});
export const userLogout = () => (dispatch, getState) => {
  dispatch(userLogoutSuccess());
};

export const userLogin = credentials => (dispatch, getState) => {
  dispatch(triggerRequest(USER_LOGIN));
  return AuthService.login(credentials.username, credentials.password)
    .then(token => {
      dispatch(userLoginSuccess(token));
      dispatch(endRequest(USER_LOGIN));
    })
    .catch(err => {
      //dispatch(triggerFailure(USER_LOGIN, err));
    });
};

// event actions

export const getEvents = events => ({
  type: FETCH_EVENTS,
  events,
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const fetchEvents = () => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENTS));
  try {
    const response = await EventService.getAll();
    let camelCaseKeys = humps.camelizeKeys(response.results);
    dispatch(getEvents(normalize(camelCaseKeys, schema.eventsList)));
    dispatch(endRequest(FETCH_EVENTS));
    return response;
  } catch (e) {
    dispatch(triggerFailure(FETCH_EVENTS, e.message));
    return e;
  }
};
export const userSignup = payload => async (dispatch, getState) => {
  dispatch(triggerRequest(USER_SIGNUP));
  try {
    const token = await AuthService.signup(payload);
    dispatch(userSignupSuccess(token.access));
    dispatch(endRequest(USER_SIGNUP));
    return token;
  } catch (e) {
    dispatch(triggerFailure(USER_SIGNUP, e));
  }
};
export const resetPassword = credentials => async (dispatch, getState) => {
  dispatch(triggerRequest(RESET_PASSWORD));
  try {
    const message = await AuthService.resetPassword(credentials.email);
    dispatch(resetPasswordSuccess(message));
    dispatch(endRequest(RESET_PASSWORD));
  } catch (e) {
    dispatch(triggerFailure(RESET_PASSWORD, e));
  }
};

export const postEvent = event => (dispatch, getState) => {
  dispatch(triggerRequest(ADD_EVENT));
  return EventService.add(event)
    .then(event => {
      // dispatch(addEvent(event))
      // cant use ADD_EVENT here since we are using different serializers for read and write
      // in write mode the organisation object isnt returned. So we simply fetch all again
      dispatch(fetchEvents());
      dispatch(endRequest(ADD_EVENT));
    })
    .catch(err => {
      dispatch(triggerFailure(ADD_EVENT, err));
    });
};
