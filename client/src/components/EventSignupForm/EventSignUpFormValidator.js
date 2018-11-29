const validate = values => {
  const errors = {},
    { name, email } = values;

  if (!name) errors.name = '*Name Required';
  if (!email) errors.email = '*Email Required';

  return errors;
};

export default validate;
