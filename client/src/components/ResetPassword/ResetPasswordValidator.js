// import { isEmail } from 'validator';

const validate = values => {
  console.log('values: ', values);
  const errors = {},
    { password, confirmPassword } = values;

  if (!password) errors.password = '*Password Required';
  if (!confirmPassword) errors.confirmPassword = '*Confirm Password Required';
  if (password && confirmPassword && password !== confirmPassword)
    errors.password = '*Password not match';

  return errors;
};

export default validate;
