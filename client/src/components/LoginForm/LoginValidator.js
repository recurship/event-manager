const validate = values => {
  const errors = {},
    { username, password } = values;

  if (!username) errors.username = '*Username Required';
  if (!password) errors.password = '*Password Required';

  return errors;
};

export default validate;
