var ID = () =>
  `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

export const validUser = {
  firstname: 'Happy',
  lastname: 'Person',
  username: `happyperson${ID()}`,
  email: `happy${ID()}@person.com`,
  password: '12345678',
};

export const invalidUser = {
  email: 'happy@person',
  password: '123',
};

export const userWithExistedUsername = {
  firstname: 'Happy',
  lastname: 'Person',
  username: 'happyperson',
  password: '12345678',
  email: `happy${ID()}@person.com`,
};

export const userWithExistedEmail = {
  firstname: 'Happy',
  lastname: 'Person',
  password: '12345678',
  email: 'happy@person.com',
  username: `happyperson${ID()}`,
};
