
import { makeRequest } from './helper';

const baseUri = '/api/events/'

export default {

  getAll: () => {
    return makeRequest(baseUri);
  },

  add: (event) => {
    return makeRequest(baseUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(event)
    });
  }

};