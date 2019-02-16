import React from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import validate from './ForgotPasswordValidator';
import renderField from '../RenderField';

let ForgotPasswordForm = props => {
  const { onSubmit, valid } = props;
  return (
    <form id="forgot-password" onSubmit={onSubmit}>
      <div className="form-group">
        <h6>Enter your email address to reset your password.</h6>
        <Field
          type="email"
          name="email"
          className="form-control"
          placeholder="Email"
          component={renderField}
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={!valid}
          className="btn btn-warning text-right"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

ForgotPasswordForm = reduxForm({
  form: 'forgetPassword',
  validate,
})(ForgotPasswordForm);

export default ForgotPasswordForm;
