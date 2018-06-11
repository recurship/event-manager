import { combineReducers } from 'redux';
import { TRIGGER_REQUEST, TRIGGER_FAILURE, END_REQUEST, USER_LOGIN, FETCH_EVENTS } from '../actions';

const defaultAppState = {
  loading: [],
  errors: []
}

const appState = (
  state = defaultAppState,
  action
) => {

  switch (action.type) {
    case TRIGGER_REQUEST:
      return {
        ...state,
        loading: [... state.loading, action.name]
      }

    case TRIGGER_FAILURE:
      return {
        errors: state.errors.push(action.error),
        loading: state.loading.filter(name => name !== action.name)
      }

    case END_REQUEST:
      return {
        ...state,
        loading: state.loading.filter(name => name !== action.name)
      }

    default:
      return state;
  }
}



const defaultUserState = {
  token: null,
  currentUser: null
}
const userState = (
  state = defaultUserState,
  action
) => {

  switch(action.type) {
    case USER_LOGIN:
      return {
        ...state,
        token: action.token
      }
    default:
      return state
  }
}



const defaultEventState = {
  events: []
};

const events = (
  state = defaultEventState,
  action
) => {

  switch(action.type) {

    case FETCH_EVENTS:
      return {
        events: [... action.events]
      }

    default:
      return state
  }
}


let reducer = combineReducers({
  appState,
  userState,
  events
});

export default reducer;