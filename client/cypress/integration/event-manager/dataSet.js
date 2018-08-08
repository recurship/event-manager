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
