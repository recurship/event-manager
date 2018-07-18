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
      localStorage.setItem('token', action.token.access);
      return {
        ...state,
        token: action.token.access,
        refresh: action.token.refresh,
      };

    case USER_LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
      };
    case REFRESH_TOKEN:
      localStorage.setItem('token', action.payload.access);
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
  console.log(state, action);
  if (action.events) {
    console.log('which action has event: ', action);
    return {
      events: Object.values(action.events.entities.events || {}),
    };
  }
  return state;
};

let reducer = combineReducers({
  appState,
  userState,
  resetPasswordState,
  events,
  form: formReducer,
});

export default reducer;
