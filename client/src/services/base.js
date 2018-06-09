

const BASE_URL = ''; // or url for staging

export default class BaseService {

  constructor() {
    this.accessToken = '';
  }

  makeRequest(path, options) {

    if(!options) {
      options = {};
    }

    options.accept = 'application/json';

    console.log('token is', this.accessToken);

    if(this.accessToken) {
      if(!options.headers) {
        options.headers = {};
      }
      options.headers['Authorization'] =  `Bearer ${ this.accessToken }`;
    }

    return fetch(BASE_URL + path, options).then(response => {
      return response.json();
    });
  }


}