

export const BASE_URL = ''; // or url for staging

export const makeRequest = (path, options) => {

  if(!options) {
    options = {};
  }

  options.accept = 'application/json';

  const token = localStorage.getItem('token');

  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Authorization'] =  `Bearer ${ token }`;
  }

  return fetch(BASE_URL + path, options).then((response) => {
    return response.json();
  });

};