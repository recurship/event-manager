import { makeRequest } from './helper';
const baseUri = '/api/sponsers/';
export default {
  getAll() {
    return makeRequest(baseUri);
  },
};
