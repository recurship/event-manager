import { isLength, isEmpty } from 'validator';

const validate = values => {
  console.log(values);
  const errors = {},
    { password, newpassword } = values;

  if (!password) errors.password = '*Password Required';
  if (!newpassword) errors.newpassword = '*New Password Required';
  if (password && isLength(password, { max: 7 }))
    errors.password = '*Password must be atleast 8 characters';
  if (newpassword && password !== newpassword)
    errors.newpassword = '*Password do not match';
  return errors;
};

export default validate;
