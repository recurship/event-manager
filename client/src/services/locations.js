import { makeRequest } from './helper';
const baseUri = '/api/locations/';
export default {
  getLocations() {
    return makeRequest(baseUri);
  },
};
