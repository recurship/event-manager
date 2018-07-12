import { isEmail, isLowercase, isLength, isString } from 'validator';

const validate = values => {
  const errors = {},
    { firstname, lastname, username, email, password } = values;

  if (!email) errors.email = '*Email Required';
  if (email && !isEmail(email)) errors.email = '*Invalid email address';

  return errors;
};

export default validate;
