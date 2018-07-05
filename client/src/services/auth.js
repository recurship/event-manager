import { makeRequest } from './helper';


export default {

  login(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return makeRequest('/api/token', { method: 'POST', body: formData });
  }

};