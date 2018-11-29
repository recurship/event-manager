import AuthService from '../services/auth';
import EventService from '../services/events';
import OrganisationService from '../services/organisation';
import { normalize } from 'normalizr';
import { eventSchema, eventListSchema } from '../schemas/eventSchema';
import { organisationSchema } from '../schemas/organisationSchema';
import { userSchema } from '../schemas/userSchema';
import OrganisationsService from '../services/organisation';
import SponsorsService from '../services/sponsors';
import LocationService from '../services/locations';
import TagsService from '../services/tags';
import EventFormService from '../services/eventform';

import UserService from '../services/user';
import * as humps from 'humps';
// app

export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export const TRIGGER_REQUEST = 'TRIGGER_REQUEST';
export const END_REQUEST = 'END_REQUEST';
export const TRIGGER_FAILURE = 'TRIGGER_FAILURE';

// current user
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_SIGNUP = 'USER_SIGNUP';
export const RESET_PASSWORD = 'RESET_PASSWORD';

// edit user
export const USER_EDIT = 'USER_EDIT';
export const FETCH_USER = 'FETCH_USER';
export const FETCH_CURRENT_USER = 'FETCH_CURRENT_USER';
export const USER_PICTURE_UPLOAD = 'IMAGE_UPDATE';

// events
export const ADD_EVENT = 'ADD_EVENT';
export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENT_DETAIL = 'FETCH_EVENT_DETAIL';
export const POST_COMMENT = 'POST_COMMENT';

// organisation
export const FETCH_ORGANISATION_DETAIL = 'FETCH_ORGANISATION_DETAIL';

//EVENT SIGNUP FORM
export const TOGGLE_EVENT_SIGNUP_MODAL = 'TOGGLE_EVENT_SIGNUP_MODAL';

export const FETCH_EVENT_SIGNUP_FORM = 'FETCH_EVENT_SIGNUP_FORM';
export const EVENT_FORM_RESPONSE = 'EVENT_FORM_RESPONSE';
export const POST_EVENT_SIGNUP_DETAILS = 'POST_EVENT_SIGNUP_DETAILS';
export const EVENT_SIGNUP_SUCCESS_RESPONSE = 'EVENT_SIGNUP_SUCCESS_RESPONSE';

//misc
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_ORGANISATIONS = 'FETCH_ORGANISATIONS';
export const FETCH_SPONSORS = 'FETCH_SPONSORS';
export const FETCH_TAGS = 'FETCH_TAGS';

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

export const userEdit = user => ({
  type: USER_EDIT,
  user,
});

export const uploadUserPicture = avatar => ({
  type: USER_PICTURE_UPLOAD,
  avatar,
});

export const getUserProfile = user => ({
  type: FETCH_USER,
  user,
});

export const userLoginSuccess = token => ({
  type: USER_LOGIN,
  token,
});

export const setCurrentUser = currentUser => ({
  type: FETCH_CURRENT_USER,
  currentUser,
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

export const userLogin = credentials => async (dispatch, getState) => {
  dispatch(triggerRequest(USER_LOGIN));
  try {
    const token = await AuthService.login(
      credentials.username,
      credentials.password
    );

    if (token.access) {
      dispatch(userLoginSuccess(token));
      const currentUser = await UserService.getCurrentUser();
      dispatch(setCurrentUser(currentUser));
    }

    dispatch(endRequest(USER_LOGIN));
    return token;
  } catch (e) {
    dispatch(triggerFailure(USER_LOGIN, e));
  }
};

// event actions

export const getEvents = events => ({
  type: FETCH_EVENTS,
  events,
});

export const getCurrentEvent = event => ({
  type: FETCH_EVENT_DETAIL,
  event,
});

export const getCurrentOrganisation = organisation => ({
  type: FETCH_ORGANISATION_DETAIL,
  organisation,
});

export const addEvent = event => ({
  type: ADD_EVENT,
  event,
});

export const postComment = comment => ({
  type: POST_COMMENT,
  comment,
});

export const fetchEvents = query => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENTS));
  return EventService.getAll(query)
    .then(response => {
      let camelCaseKeys = humps.camelizeKeys(response);
      dispatch(getEvents(normalize(camelCaseKeys, eventListSchema)));
      dispatch(endRequest(FETCH_EVENTS));
    })
    .catch(err => {
      dispatch(triggerFailure(FETCH_EVENTS, err.message));
    });
};
export const fetchUserProfile = userId => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_USER));
  try {
    const user = await UserService.getUserProfile(userId);
    let camelCaseKeys = humps.camelizeKeys(user);
    dispatch(getUserProfile(normalize(camelCaseKeys, userSchema)));
    dispatch(endRequest(FETCH_USER));
  } catch (e) {
    dispatch(triggerFailure(FETCH_USER, e.message));
  }
};
export const fetchCurrentEvent = eventId => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_EVENT_DETAIL));
  try {
    const event = await EventService.getCurrentEvent(eventId);
    let camelCaseKeys = humps.camelizeKeys(event);
    dispatch(getCurrentEvent(normalize(camelCaseKeys, eventSchema)));
    dispatch(endRequest(FETCH_EVENT_DETAIL));
  } catch (e) {
    dispatch(triggerFailure(FETCH_EVENT_DETAIL, e));
  }
};

export const fetchCurrentOrganisation = organisationId => async (
  dispatch,
  getState
) => {
  dispatch(triggerRequest(FETCH_ORGANISATION_DETAIL));
  try {
    const organisation = await OrganisationService.getCurrentOrganisation(
      organisationId
    );
    let camelCaseKeys = humps.camelizeKeys(organisation);
    dispatch(
      getCurrentOrganisation(normalize(camelCaseKeys, organisationSchema))
    );
    dispatch(endRequest(FETCH_ORGANISATION_DETAIL));
  } catch (e) {
    dispatch(triggerFailure(FETCH_ORGANISATION_DETAIL, e));
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
  event = humps.decamelizeKeys(event);
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

export const addComment = (comment, eventID) => (dispatch, getState) => {
  dispatch(triggerRequest(POST_COMMENT));
  comment = humps.decamelizeKeys(comment);
  return EventService.addComment(comment, eventID)
    .then(comment => {
      dispatch(postComment(comment));
      dispatch(fetchCurrentEvent(eventID));
      dispatch(endRequest(POST_COMMENT));
    })
    .catch(err => {
      dispatch(triggerFailure(POST_COMMENT, err));
    });
};

export const userProfileEdit = user => async (dispatch, getState) => {
  dispatch(triggerRequest(USER_EDIT));
  try {
    const editedUser = await UserService.editUser(user);
    dispatch(userEdit(editedUser));
    dispatch(endRequest(USER_EDIT));
  } catch (e) {
    dispatch(triggerFailure(USER_EDIT, e));
  }
};

export const userProfilePictureUpload = avatar => async (
  dispatch,
  getState
) => {
  dispatch(triggerRequest(USER_PICTURE_UPLOAD));
  try {
    const userWithUpdatedAvatar = await UserService.avatarUpload(avatar);
    dispatch(userEdit(userWithUpdatedAvatar));
    dispatch(endRequest(USER_PICTURE_UPLOAD));
  } catch (e) {
    dispatch(triggerFailure(USER_PICTURE_UPLOAD, e));
  }
};
// misc actions
export const getOrganisations = organisations => ({
  type: FETCH_ORGANISATIONS,
  organisations,
});

export const getSponsors = sponsors => ({
  type: FETCH_SPONSORS,
  sponsors,
});

export const getLocations = locations => ({
  type: FETCH_LOCATIONS,
  locations,
});

export const getTags = tags => ({
  type: FETCH_TAGS,
  tags,
});

export const fetchOrganisation = query => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_ORGANISATIONS));
  try {
    const response = await OrganisationsService.getAll();
    let normalized = humps.camelizeKeys(response.results);
    dispatch(getOrganisations(normalized));
    dispatch(endRequest(FETCH_ORGANISATIONS));
  } catch (e) {
    dispatch(triggerFailure(FETCH_ORGANISATIONS, e.message));
    return e;
  }
};

export const fetchSponsors = query => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_SPONSORS));
  try {
    const response = await SponsorsService.getAll();
    let normalized = humps.camelizeKeys(response.results);
    dispatch(getSponsors(normalized));
    dispatch(endRequest(FETCH_SPONSORS));
  } catch (e) {
    dispatch(triggerFailure(FETCH_SPONSORS, e.message));
    return e;
  }
};

export const fetchLocations = query => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_LOCATIONS));
  try {
    const response = await LocationService.getAll();
    let normalized = humps.camelizeKeys(response.results);
    dispatch(getLocations(normalized));
    dispatch(endRequest(FETCH_LOCATIONS));
  } catch (e) {
    dispatch(triggerFailure(FETCH_LOCATIONS, e.message));
    return e;
  }
};

export const fetchTags = query => async (dispatch, getState) => {
  dispatch(triggerRequest(FETCH_TAGS));
  try {
    const response = await TagsService.getAll();
    let normalized = humps.camelizeKeys(response.results);
    dispatch(getTags(normalized));
    dispatch(endRequest(FETCH_TAGS));
  } catch (e) {
    dispatch(triggerFailure(FETCH_TAGS, e.message));
    return e;
  }
};

//event form action

export const toggleModal = state => ({
  type: TOGGLE_EVENT_SIGNUP_MODAL,
  showSignupModal: state,
});

export const eventForm = form => ({
  type: EVENT_FORM_RESPONSE,
  form,
});

export const postEventSignup = userDetails => ({
  type: POST_EVENT_SIGNUP_DETAILS,
  userDetails,
});

export const eventSignupSuccess = payload => ({
  type: EVENT_SIGNUP_SUCCESS_RESPONSE,
  payload,
});

export const fetchForm = () => ({
  type: FETCH_EVENT_SIGNUP_FORM,
});

export const fetchEventFormById = id => async dispatch => {
  dispatch(toggleModal(true));
  dispatch(fetchForm());
  dispatch(triggerRequest(FETCH_EVENT_SIGNUP_FORM));
  try {
    const response = await EventFormService.getFormById(id);

    dispatch(eventForm(response));
  } catch (e) {
    dispatch(triggerFailure(FETCH_EVENT_SIGNUP_FORM, e.message));
    return e;
  }
};

export const postEventSignupDetails = (
  userDetails,
  formId
) => async dispatch => {
  dispatch(triggerRequest(POST_EVENT_SIGNUP_DETAILS));
  try {
    const response = await EventFormService.signupForEvent(userDetails, formId);

    dispatch(eventSignupSuccess(response));
    dispatch(toggleModal(false));
  } catch (e) {
    dispatch(triggerFailure(POST_EVENT_SIGNUP_DETAILS, e.message));
    return e;
  }
};
