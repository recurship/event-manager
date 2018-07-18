// import {  } from './../actions';
import { store } from '../../src';
import { REFRESH_TOKEN, refreshToken } from '../actions';

export const BASE_URL = ''; // or url for staging
const makeFetchRequest = (path, options) => {
  if (!options) {
    options = {};
  }

  options.accept = 'application/json';

  const token = localStorage.getItem('token');

  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(BASE_URL + path, options).then(response => {
    return response.json();
  });
};

export const makeRequest = async (path, options) => {
  const response = await makeFetchRequest(path, options);
  if (response.code && response.code == 'token_not_valid') {
    const { refresh } = store.getState().userState,
      formData = new FormData();
    formData.append('refresh', refresh);

    const body = { method: 'POST', body: formData },
      refreshedToken = await makeFetchRequest('/api/token/refresh', body),
      refreshTokenAction = refreshToken(refreshedToken);
    store.dispatch(refreshTokenAction);
    makeRequest(path, options);
  } else {
    return response;
  }
};
