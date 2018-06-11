
import AuthService from '../services/auth';
import EventService from '../services/events';


// app

export const TRIGGER_REQUEST = 'TRIGGER_REQUEST'
export const END_REQUEST = 'END_REQUEST'
export const TRIGGER_FAILURE = 'TRIGGER_FAILURE'

// current user
export const USER_LOGIN = 'USER_LOGIN'

// events
export const FETCH_EVENTS = 'FETCH_EVENTS'


const authService = new AuthService();
const eventService = new EventService();

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

export const userLogin = credentials => (dispatch, getState) => {
  dispatch(triggerRequest(USER_LOGIN))
  return authService.login(credentials.username, credentials.password)
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

export const fetchEvents = () => (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENTS))
  return eventService.getAll().then(response => {
    dispatch(getEvents(response.results))
    dispatch(endRequest(FETCH_EVENTS))
  })
  .catch(err => {
    dispatch(triggerFailure(FETCH_EVENTS, err))
  })
}