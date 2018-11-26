import { makeRequest } from './helper';
import { decamelizeKeys } from 'humps';

const baseUri = '/api/forms';

export default {
  getFormById: id => {
    return makeRequest(`${baseUri}/${id}/?format=json`);
  },

  signupForEvent: (userDetails, formId) => {
    let payload = null;
    if (userDetails.phone) {
      payload = {
        submission: [
          { position: 0, reply: userDetails.name },
          { position: 1, reply: userDetails.email },
          {
            position: 2,
            reply: userDetails.phone,
          },
        ],
      };
    } else {
      payload = {
        submission: [
          { position: 0, reply: userDetails.name },
          { position: 1, reply: userDetails.email },
        ],
      };
    }

    return makeRequest(`${baseUri}/${formId}/submissions/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  },
};
