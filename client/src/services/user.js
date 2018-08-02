import { makeRequest } from './helper';

const baseUriUsers = '/api/users/';
const baseUriUser = '/api/user/';

export default {
  editUser: user => {
    return makeRequest(baseUriUser, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: user,
    });
  },

  getUserProfile: userId => {
    return makeRequest(`${baseUriUsers}${userId}/`);
  },
};
