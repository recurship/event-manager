import React from 'react';
import { Button } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import validate from './ResetPasswordValidator';
import renderField from '../RenderField';

let ResetPasswordForm = props => {
  const { onSubmit, valid } = props;
  console.log('props: ', props);
  console.log('valid: ', valid);
  return (
    <form id="forgot-password" onSubmit={onSubmit}>
      <div className="form-group">
        <h6>Enter your password & confirm password</h6>
        <Field
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          component={renderField}
        />
        <Field
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Confirm Password"
          component={renderField}
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={!valid}
          className="btn btn-warning text-right"
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};

ResetPasswordForm = reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordForm);

export default ResetPasswordForm;
