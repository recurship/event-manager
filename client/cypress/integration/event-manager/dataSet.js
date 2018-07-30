var ID = function() {
  return (
    '_' +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
};
export const randomData = {
  firstname: 'Happy',
  lastname: 'Person',
  existedUsername: 'happyperson',
  uniqueUsername: `happyperson${ID()}`,
  existedEmail: 'happy@person.com',
  uniqueEmail: `happy${ID()}@person.com`,
  password: '12345678',
  invalidEmail: 'happy@person',
  invalidPassword: '123',
  uniqueEmail2: `happy${ID()}@person.com`,
  uniqueUsername2: `happyperson${ID()}`,
};
