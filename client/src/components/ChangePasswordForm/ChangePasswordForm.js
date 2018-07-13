import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'reactstrap';
import validate from './ChangePasswordValidator';
import renderField from './../RenderField';

let ChangePasswordForm = props => {
  const { onSubmit, valid } = props;
  return (
    <form id="change-password" onSubmit={onSubmit}>
      <div className="form-group">
        <h6>Change your recent password</h6>
        <Field
          type="password"
          name="password"
          className="form-control"
          placeholder="Password"
          component={renderField}
        />
        <Field
          type="password"
          name="newpassword"
          className="form-control"
          placeholder="New password"
          component={renderField}
        />
      </div>
      <div>
        <Button
          type="submit"
          disabled={!valid}
          className="btn btn-warning btn-right"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

ChangePasswordForm = reduxForm({
  form: 'changePassword',
  validate,
})(ChangePasswordForm);

export default ChangePasswordForm;
