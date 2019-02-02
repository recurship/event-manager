import { getFullname, makeQueryStringTransformable } from '../../utils/utils';
import { userData, organization, organizations, tagSearch } from './testData';

it('Shoud check if getFullname util works', () => {
  expect(getFullname(userData)).toEqual('Jack John');
  expect(getFullname({ firstName: userData.firstName })).toEqual('Jack');
  expect(getFullname({ firstName: '', lastName: '' })).toEqual('-');
});

it('Shoud check if makeQueryStringTransformable util works', () => {
  expect(makeQueryStringTransformable()).toEqual({});
  expect(makeQueryStringTransformable(organization)).toEqual({
    filterOrganisation: '1',
    filterDateFrom: '2018-12-06',
    filterDateTo: '2018-12-10',
  });
  expect(makeQueryStringTransformable(organizations)).toEqual({
    filterOrganisation: '1,2',
    filterLocation: '2',
    filterKeywords: 'react,redux',
  });
  expect(makeQueryStringTransformable(tagSearch)).toEqual({
    filterTags: '3,7',
    filterTime: 'morning,evening',
    sortBy: 'location',
  });
});
