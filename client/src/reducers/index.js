import { combineReducers } from 'redux';
import {
  TRIGGER_REQUEST,
  TRIGGER_FAILURE,
  END_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
  RESET_PASSWORD,
  REFRESH_TOKEN,
} from '../actions';
import { reducer as formReducer } from 'redux-form';
const defaultAppState = {
  loading: [],
  errors: [],
};

const appState = (state = defaultAppState, action) => {
  switch (action.type) {
  case TRIGGER_REQUEST:
    return {
      ...state,
      loading: [...state.loading, action.name],
    };

  case TRIGGER_FAILURE:
    return {
      errors: state.errors.push(action.error),
      loading: state.loading.filter(name => name !== action.name),
    };

  case END_REQUEST:
    return {
      ...state,
      loading: state.loading.filter(name => name !== action.name),
    };

  default:
    return state;
  }
};

const defaultUserState = {
  token: null,
  currentUser: null,
};
const userState = (state = defaultUserState, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      token: action.token.access,
      refresh: action.token.refresh,
    };

  case USER_LOGOUT:
    return {
      ...state,
      token: null,
    };
  case REFRESH_TOKEN:
    return {
      ...state,
      token: action.payload.access,
    };
  default:
    return state;
  }
};

const defaultResetPasswordState = {
  message: null,
};
const resetPasswordState = (state = defaultResetPasswordState, action) => {
  switch (action.type) {
  case RESET_PASSWORD:
    return {
      ...state,
      message: action.message,
    };

  default:
    return state;
  }
};

const defaultEventState = {
  events: [],
};

const events = (state = defaultEventState, action) => {
  if (action.events) {
    return {
      events: Object.values(action.events.entities.events || {}),
    };
  }
  return state;
};

const eventDetail = (state = defaultEventState, action) => {
  if (action.event) {
    return {
      event: { ...Object.values(action.event.entities.events)[0] },
    };
  }
  return state;
};

const defaultOrganisationState = {
  organisations: [],
};

const organisationDetail = (state = defaultOrganisationState, action) => {
  if (action.organisation) {
    return {
      organisation: Object.values(action.organisation.entities.organisation),
    };
  }
  return state;
};

let reducer = combineReducers({
  appState,
  userState,
  resetPasswordState,
  events,
  eventDetail,
  organisationDetail,
  form: formReducer,
});

export default reducer;
