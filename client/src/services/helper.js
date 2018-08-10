import { store } from '../../src';
import { refreshToken } from '../actions';
export const BASE_URL = ''; // or url for staging
const makeFetchRequest = (path, options) => {
  if (!options) {
    options = {};
  }

  options.accept = 'application/json';

  const { token } = store.getState().userState;
  if (token) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Authorization'] = `Bearer ${token}`;
  }

  return fetch(BASE_URL + path, options).then(async response => {
    return {
      body: response.json(),
      status: response.status,
    };
  });
};

export const makeRequest = async (path, options) => {
  const response = await makeFetchRequest(path, options);
  if (response.status && response.status == 401) {
    const { refresh } = store.getState().userState,
      formData = new FormData();
    formData.append('refresh', refresh);
    const body = { method: 'POST', body: formData },
      refreshedReponse = await makeFetchRequest('/api/token/refresh', body),
      refreshedToken = await refreshedReponse.body,
      refreshTokenAction = refreshToken(refreshedToken);
    store.dispatch(refreshTokenAction);
    makeRequest(path, options);
  } else {
    return await response.body;
  }
};
