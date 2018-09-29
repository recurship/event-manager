// @flow
import { AttendeeType } from '../types/attendee-types';
/**
 * @author Saad Abbasi
 * @description: Arrays or objects are not transformable to querystring, we need to transform according
 * @argument: {params} may have any type and lengths of keys values
 * @returns: {Object} with same keys as that of prarams, but transforamable to querystring
 */

export function makeQueryStringTransformable(params = {}): Object {
  let transformedParams = {};
  for (let key in params) {
    if (params.hasOwnProperty(key)) {
      if (typeof params[key] === 'object' && Array.isArray(params[key])) {
        transformedParams[key] = params[key].map(x => `${x.value}`).join(',');
      } else if (
        typeof params[key] === 'object' &&
        !Array.isArray(params[key])
      ) {
        transformedParams[key] = `${params[key].value}`;
      } else {
        transformedParams[key] = params[key];
      }
    }
  }
  return transformedParams;
}

export function getFullname(user: AttendeeType): string {
  let name = '';
  if (user.firstName) {
    name += `${user.firstName} `;
  }
  if (user.lastName) {
    name += `${user.lastName} `;
  }

  return name ? name : '-';
}
