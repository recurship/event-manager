import { makeRequest } from './helper';
const baseUri = '/api/tags/';
export default {
  getAll() {
    return makeRequest(baseUri);
  },
};
