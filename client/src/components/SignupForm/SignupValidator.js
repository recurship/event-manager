import { isEmail, isLowercase, isLength, isString } from 'validator';

const validate = values => {
  const errors = {},
    { firstname, lastname, username, email, password } = values;

  if (!email) errors.email = '*Email Required';
  if (email && !isEmail(email)) errors.email = '*Invalid email address';

  if (!username) errors.username = '*Username Required';
  if (username && !isLowercase(username))
    errors.username = '*Username must be in lowercase';

  if (!firstname) errors.firstname = '*First name required';

  if (!lastname) errors.lastname = '*Last name required';

  if (!password) errors.password = '*Password Required';
  if (password && isLength(password, { max: 7 }))
    errors.password = '*Password must be atleast 8 characters';
  return errors;
};

export default validate;
