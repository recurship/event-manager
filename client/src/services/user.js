import { makeRequest } from './helper';

const baseUri = '/api/user/';

export default {
  edit: user => {
    return makeRequest(baseUri, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  },
};
