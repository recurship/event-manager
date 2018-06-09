import BaseService from "./base";



export default class AuthService extends BaseService {

  login(username, password) {
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    return this.makeRequest('/api/token', { method: 'POST', body: formData });
  }

}