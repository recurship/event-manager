var getId = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

export const validUser = {
  firstname: 'Happy',
  lastname: 'Person',
  username: `happyperson${getId()}`,
  email: `happy${getId()}@person.com`,
  password: '12345678',
};

export const invalidUser = {
  email: 'happy@person',
  username: 'Dadmin',
  password: '123',
};

export const wrongCredentials = {
  username: 'nothappyperson',
  password: '123457783',
};
export const ValidCredentials = {
  username: 'admin',
  password: '1299459ML',
};

export const anotherUser = {
  username: 'usmandap',
  email: 'test@test.com',
};

export const userWithExistedUsername = {
  firstname: 'Happy',
  lastname: 'Person',
  username: 'happyperson',
  password: '12345678',
  email: `happy${getId()}@person.com`,
};

export const userWithExistedEmail = {
  firstname: 'Happy',
  lastname: 'Person',
  password: '12345678',
  email: 'happy@person.com',
  username: `happyperson${getId()}`,
};

export const constants = {
  WAITING_TIME: 30000,
  BASE_URL: '/events',
  TAGS_INPUT_FIELD:
    ':nth-child(6) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  TIME_INPUT_FIELD:
    ':nth-child(7) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  KEYWORDS_INPUT_FIELD: ':nth-child(8) > .form-control',
  ORGANISATION_INPUT_FIELD:
    ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  LOCATION_INPUT_FIELD:
    ':nth-child(4) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  SPONSORS_INPUT_FIELD:
    ':nth-child(5) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  TAGS_FIELD_OPTION_1: '#react-select-5--option-2',
  TAGS_FIELD_OPTION_2: '#react-select-5--option-1',
  ORGANISATION_FIELD_OPTION_1: '#react-select-2--option-0',
  ORGANISATION_FIELD_OPTION_2: '#react-select-2--option-1',
  LOCATION_FIELD_OPTION_1: '#react-select-3--option-0',
  LOCATION_FIELD_OPTION_2: '#react-select-3--option-1',
  SPONSORS_FIELD_OPTION_1: '#react-select-4--option-0',
  SPONSORS_FIELD_OPTION_2: '#react-select-4--option-1',
  TIME_FIELD_OPTION_1: '#react-select-6--option-0',
  TIME_FIELD_OPTION_2: '#react-select-6--option-1',
  EVENT_END_DATE: Cypress.moment()
    .subtract('6', 'days')
    .format('YYYY-MM-DD'),
  EVENT_START_DATE: Cypress.moment()
    .subtract('7', 'years')
    .format('YYYY-MM-DD'),
  TIME_FIELD_VALUE:
    ' .Select > .Select-control > .Select-multi-value-wrapper#react-select-6--value > div',
  TAG_FIELD_VALUE:
    ' .Select > .Select-control > .Select-multi-value-wrapper#react-select-5--value > div',
  ORGANISATION_FIELD_VALUE:
    ' .Select > .Select-control > .Select-multi-value-wrapper#react-select-2--value > div',
  SPONSORS_FIELD_VALUE:
    ' .Select > .Select-control > .Select-multi-value-wrapper#react-select-4--value > div',
};
