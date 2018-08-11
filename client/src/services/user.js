import { makeRequest } from './helper';

const baseUriUsers = '/api/users/';
const baseUriUser = '/api/user/';

export default {
  editUser: user => {
    return makeRequest(baseUriUser, {
      method: 'PATCH',
      body: user,
    });
  },

  getUserProfile: userId => {
    return makeRequest(`${baseUriUsers}${userId}/`);
  },

  getCurrentUser: () => {
    return makeRequest(baseUriUser);
  },

  avatarUpload: avatar => {
    let formData = new FormData();
    formData.append('avatar', avatar);
    return makeRequest(baseUriUser, { method: 'PUT', body: formData });
  },
};
