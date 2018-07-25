import { makeRequest } from './helper';
const baseUri = '/api/sponsers/';
export default {
  getSponsors() {
    return makeRequest(baseUri);
  },
};
