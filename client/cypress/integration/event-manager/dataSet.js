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
  tag:
    ':nth-child(6) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  delay: 30000,
  kw: ':nth-child(8) > .form-control',
  URL: 'http://localhost:3000/events/',
  org:
    ':nth-child(1)  .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  VAL1: '#react-select-5--option-2',
  VAL2: '#react-select-5--option-1',
  VAL3: '#react-select-2--option-0',
  VAL4: '#react-select-2--option-1',
  loc:
    ':nth-child(4) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  VAL5: '#react-select-3--option-0',
  VAL6: '#react-select-3--option-1',
  spons:
    ':nth-child(5) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',

  VAL7: '#react-select-4--option-0',
  VAL8: '#react-select-4--option-1',
  time:
    ':nth-child(7) .Select  .Select-control  .Select-arrow-zone  .Select-arrow',
  VAL9: '#react-select-6--option-0',
  VAL10: '#react-select-6--option-1',
};
