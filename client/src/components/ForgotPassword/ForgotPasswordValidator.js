import { isEmail } from 'validator';

const validate = values => {
  const errors = {},
    { email } = values;

  if (!email) errors.email = '*Email Required';
  if (email && !isEmail(email)) errors.email = '*Invalid email address';

  return errors;
};

export default validate;
