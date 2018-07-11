import { isEmail, isLowercase, isLength } from 'validator';

const validate = values => {
  const errors = {},
    { fullname, username, email, password } = values;

  if (!email) errors.email = '*Email Required';
  if (email && !isEmail(email)) errors.email = '*Invalid email address';

  if (!username) errors.username = '*Username Required';
  if (username && !isLowercase(username))
    errors.username = '*Username must be in lowercase';

  if (!fullname) errors.fullname = '*Full name required';
  if (fullname && isLength(fullname, { max: 3 }))
    errors.fullname = '*Full name must be atleast 3 characters';
  if (fullname && isLength(fullname, { min: 20 }))
    errors.fullname = '*Full name should not be more than 20 characters';

  if (!password) errors.password = '*Password Required';
  return errors;
};

export default validate;
