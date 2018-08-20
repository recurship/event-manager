import { makeRequest } from './helper';
import { stringify } from 'query-string';
import { decamelizeKeys, HumpsOptions } from 'humps';
import { store } from '../../src';

const baseUri = '/api/events/';

export default {
  getAll: query => {
    let eventsBaseUri = baseUri;
    if (query && typeof query == 'object') {
      const paramsNormalized = decamelizeKeys(query);
      const eventsQuery = stringify(paramsNormalized);
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

  getCurrentEvent: eventId => {
    return makeRequest(`${baseUri}${eventId}/`);
  },

  addComment: (comment, eventID) => {
    return makeRequest(`${baseUri}${eventID}/comment/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(comment),
    });
  },
};
