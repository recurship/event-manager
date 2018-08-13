import { makeRequest } from './helper';

const baseUriUsers = '/api/users/';
const baseUriUser = '/api/user/';

export default {
  editUser: user => {
    let formData = new FormData();
    formData.append('username', user.username.value);
    formData.append('first_name', user.firstname.value);
    formData.append('last_name', user.lastname.value);
    return makeRequest(baseUriUser, {
      method: 'PATCH',
      body: formData,
    });
  },

  getUserProfile: userId => {
    return makeRequest(`${baseUriUsers}${userId}/`);
  },

  getCurrentUser: () => {
    return makeRequest(baseUriUser);
  },
};
