import { getFullname, makeQueryStringTransformable } from '../../utils/utils';

it('Shoud check if getFullname util works', () => {
  expect(getFullname({ firstName: 'Jack', lastName: 'John' })).toEqual(
    'Jack John'
  );
  expect(getFullname({ firstName: 'Jack' })).toEqual('Jack');
  expect(getFullname({ firstName: '', lastName: '' })).toEqual('-');
});

it('Shoud check if makeQueryStringTransformable util works', () => {
  expect(makeQueryStringTransformable()).toEqual({});
  expect(
    makeQueryStringTransformable({
      filterOrganisation: [{ label: 'recurship', value: 1 }],
      filterDateFrom: '2018-12-06',
      filterDateTo: '2018-12-10',
    })
  ).toEqual({
    filterOrganisation: '1',
    filterDateFrom: '2018-12-06',
    filterDateTo: '2018-12-10',
  });
  expect(
    makeQueryStringTransformable({
      filterOrganisation: [
        { label: 'recurship', value: 1 },
        { label: 'ngGirls', value: 2 },
      ],
      filterLocation: { label: 'nestio', value: 2 },
      filterKeywords: 'react,redux',
    })
  ).toEqual({
    filterOrganisation: '1,2',
    filterLocation: '2',
    filterKeywords: 'react,redux',
  });
  expect(
    makeQueryStringTransformable({
      filterTags: [
        { label: 'tech', value: 3 },
        { label: 'open source', value: 7 },
      ],
      filterTime: [
        { label: 'Morning', value: 'morning' },
        { label: 'evening', value: 'evening' },
      ],
      sortBy: { label: 'Location', value: 'location' },
    })
  ).toEqual({
    filterTags: '3,7',
    filterTime: 'morning,evening',
    sortBy: 'location',
  });
});
