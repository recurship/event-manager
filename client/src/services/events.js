import { makeRequest } from './helper';
import queryString from 'query-string';
import { store } from '../../src';
const baseUri = '/api/events/';
export default {
  getAll: query => {
    let _baseUri = baseUri;
    if (query) {
      // if (!query.value)
      //TODO; only sort by type.
      if (query.value && query.type)
        _baseUri += queryString.stringify({ [query.type]: query.value });
    }
    console.log('_baseUri: ', _baseUri);
    // makeFakeEventApiSearch(query);
    return makeRequest(baseUri);
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
    return makeRequest(`/api/events/${eventId}/`);
  },
};

function makeFakeEventApiSearch(query) {
  return new Promise((resolve, reject) => {
    const appState = store.getState();
    let events = appState.events && appState.events.events;
    console.log(query);
    console.log('BEFORE: ', events);
    if (events)
      events = events.filter(event => event[query.type] == query.value);

    setTimeout(() => resolve(events), 2000);
  });
}
