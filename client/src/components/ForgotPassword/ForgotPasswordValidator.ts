import { isEmail } from 'validator';

type Errors = {
  email?: string
}

const validate = values => {
  const errors: Errors = {},
    { email } = values;

  if (!email) errors.email = '*Email Required';
  if (email && !isEmail(email)) errors.email = '*Invalid email address';

  return errors;
};

export default validate;
