import { combineReducers } from 'redux';
import {
  TRIGGER_REQUEST,
  TRIGGER_FAILURE,
  END_REQUEST,
  USER_LOGIN,
  USER_LOGOUT,
  RESET_PASSWORD,
  REFRESH_TOKEN,
  FETCH_ORGANISATIONS,
  FETCH_SPONSORS,
  FETCH_LOCATIONS,
  FETCH_USER,
  FETCH_TAGS,
  USER_EDIT,
  FETCH_CURRENT_USER,
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
  currentUser: {},
};

const userState = (state = defaultUserState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.token.access,
        refresh: action.token.refresh,
      };
    case FETCH_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser,
      };

    case USER_LOGOUT:
      return {
        ...state,
        token: null,
        currentUser: null,
        refresh: null,
      };

    case REFRESH_TOKEN:
      return {
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

const currentEvent = (state = defaultEventState, action) => {
  if (action.event) {
    return {
      event: { ...Object.values(action.event.entities.events)[0] },
    };
  }
  return state;
};

const defaultUserProfileState = {
  user: null,
};

const userProfile = (state = defaultUserProfileState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        user: { ...Object.values(action.user.entities.user)[0] },
      };
    case USER_EDIT:
      return {
        user: { ...Object.values(action.user) },
      };
    default:
      return state;
  }
};

const defaultOrganisationState = {
  organisation: {},
};

const currentOrganisation = (state = defaultOrganisationState, action) => {
  if (action.organisation) {
    return {
      organisation: {
        ...Object.values(action.organisation.entities.organisation)[0],
      },
    };
  }
  return state;
};

const defaultOrganisationsState = {
  organisations: [],
};
const organisationsState = (state = defaultOrganisationsState, action) => {
  switch (action.type) {
    case FETCH_ORGANISATIONS:
      return {
        ...state,
        organisations: action.organisations,
      };
    default:
      return state;
  }
};

const defaultSponsorsState = {
  sponsors: [],
};
const sponsorsState = (state = defaultSponsorsState, action) => {
  switch (action.type) {
    case FETCH_SPONSORS:
      return {
        ...state,
        sponsors: action.sponsors,
      };
    default:
      return state;
  }
};

const defaultLocationState = {
  locations: [],
};
const locationState = (state = defaultLocationState, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
      };
    default:
      return state;
  }
};

const defaultTagsState = {
  tags: [],
};
const tagsState = (state = defaultTagsState, action) => {
  switch (action.type) {
    case FETCH_TAGS:
      return {
        ...state,
        tags: action.tags,
      };
    default:
      return state;
  }
};

let reducer = combineReducers({
  appState,
  userState,
  resetPasswordState,
  events,
  currentEvent,
  currentOrganisation,
  userProfile,
  organisations: organisationsState,
  sponsors: sponsorsState,
  locations: locationState,
  tags: tagsState,
  form: formReducer,
});

export default reducer;
