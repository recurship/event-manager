type Errors = {
  username: string,
  password: string
}
type Args = {
  username: string,
  password: string
}

const validate = (values: Args) => {
  const errors: Errors = {
    username: '', password: ''
  };
  const { username, password } = values;

  if (!username) errors.username = '*Username Required';
  if (!password) errors.password = '*Password Required';

  return errors;
};

export default validate;
