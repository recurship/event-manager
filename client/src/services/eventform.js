import { makeRequest } from './helper';
import { decamelizeKeys } from 'humps';

const baseUri = '/api/forms';

export default {
  getFormById: id => {
    return makeRequest(`${baseUri}/${id}/?format=json`);
  },

  signupForEvent: (userDetails, formId) => {
    const formData = new FormData();
    formData.append('name', userDetails.name);
    formData.append('email', userDetails.email);
    formData.append('contact_number', userDetails.phone);
    //console.log(userDetails);
    /*const payload = {
      name: userDetails.name,
      email: userDetails.email,
      contact_number: userDetails.phone,
    };*/
    return makeRequest(`${baseUri}/${formId}/submissions/`, {
      method: 'POST',
      body: formData,
    });
  },
};
