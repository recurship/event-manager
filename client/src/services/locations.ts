import { makeRequest } from './helper';
const baseUri = '/api/locations/';
export default {
  getAll() {
    return makeRequest(baseUri);
  },
};
