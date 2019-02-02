import { makeRequest } from './helper';

export default {
  login(username, password) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return makeRequest('/api/token', { method: 'POST', body: formData });
  },

  signup(payload) {
    const formData = new FormData();
    formData.append('firstname', payload.firstname);
    formData.append('lastname', payload.lastname);
    formData.append('username', payload.username);
    formData.append('email', payload.email);
    formData.append('password', payload.password);
    return makeRequest('/api/register/', { method: 'POST', body: formData });
  },
  forgotPassword(email) {
    const formData = new FormData();
    formData.append('email', email);
    return makeRequest('/api/reset-password/', {
      method: 'POST',
      body: formData,
    });
  },
  resetPassword(payload) {
    const formData = new FormData();
    formData.append('password', payload.password);
    formData.append('email', payload.email);
    formData.append('token', payload.token);
    return makeRequest('api/reset-password-confirm/', {
      method: 'POST',
      body: formData,
    });
  },
};

function fakeApi(email) {
  const msg = 'Please check your email';
  return new Promise(resolve => setTimeout(_ => resolve(msg), 2000));
}
