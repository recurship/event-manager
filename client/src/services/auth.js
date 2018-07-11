import { makeRequest } from './helper';

export default {
  login(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return makeRequest('/api/token', { method: 'POST', body: formData });
  },

  signup(payload) {
    let formData = new FormData();
    formData.append('username', payload.username);
    formData.append('fullname', payload.fullname);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    return fakeApi('/api/register');
    // return makeRequest('/api/token', { method: 'POST', body: formData });
  },
};
function fakeApi(path) {
  return new Promise(resolve => {
    setTimeout(
      () =>
        resolve({
          access: 'sfdhg9384fny8273ytvb2354tvy4580tvt234tv79329t7',
        }),
      3000
    );
  });
}
