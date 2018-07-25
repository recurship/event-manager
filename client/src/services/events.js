import { makeRequest } from './helper';
import queryString from 'query-string';
import { decamelizeKeys, HumpsOptions } from 'humps';
import { store } from '../../src';
const baseUri = '/api/events/';
export default {
  getAll: query => {
    let eventsBaseUri = baseUri;
    if (query && typeof query == 'object') {
      const paramsNormalized = decamelizeKeys(query);
      const eventsQuery = queryString.stringify(paramsNormalized);
      eventsBaseUri += `?${eventsQuery}`;
    }
    return makeRequest(eventsBaseUri);
  },

  add: event => {
    return makeRequest(baseUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  },
  getEventDetail: eventId => {
    return makeRequest(`${baseUri}${eventId}/`);
  },
};

function makeFakeEventApiSearch(query) {
  return new Promise((resolve, reject) => {
    const appState = store.getState();
    let events = appState.events && appState.events.events;
    if (events)
      events = events.filter(event => event[query.type] == query.value);

    setTimeout(() => resolve(events), 2000);
  });
}
