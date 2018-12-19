import { makeRequest } from './helper';

const baseUri = '/api/organisations/';

export default {
  getAll: () => {
    return makeRequest(baseUri);
  },

  getCurrentOrganisation: organisationId => {
    return makeRequest(`${baseUri}${organisationId}/`);
  },
};
