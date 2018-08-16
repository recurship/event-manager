// @flow

import React from 'react';
import { Button } from 'reactstrap';
import './LoginForm.css';
import { Field, reduxForm } from 'redux-form';
import renderField from '../RenderField';
import validate from './LoginValidator';

// type LoginEvent = (Event<>;)
type Props = {
  onSubmit(e: SyntheticEvent): void,
};

let LoginForm = (props: Props) => {
  const { valid, onSubmit } = props;
  return (
    <form id="login-form" onSubmit={onSubmit}>
      <Field
        type="text"
        placeholder="User Name"
        className="form-control"
        name="username"
        component={renderField}
      />

      <Field
        type="password"
        placeholder="Password"
        className="form-control"
        name="password"
        component={renderField}
      />

      <Button
        type="submit"
        className="btn btn-primary"
        disabled={!valid}
        value="Sign in"
      >
        Submit
      </Button>
    </form>
  );
};

LoginForm = reduxForm({
  form: 'login',
  validate,
})(LoginForm);

export default LoginForm;
