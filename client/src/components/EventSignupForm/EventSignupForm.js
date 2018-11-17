import React from 'react';
import { Button } from 'reactstrap';
import './EventSignupForm.css';
import { Field, reduxForm } from 'redux-form';
import renderField from '../RenderField';
//import validate from './LoginValidator';

const placeHolder = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
};

const EventSignupForm = props => {
  return (
    <form id="login-form" onSubmit={props.onSubmit}>
      {props.fields.map((field, i) => (
        <Field
          type="text"
          key={i}
          placeholder={placeHolder[field.label]}
          className="form-control"
          name={field.label}
          component={renderField}
        />
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.registered ? (
          <Button
            className="btn btn-primary"
            value="Signup_success"
            onClick={() => props.toggle(false)}
          >
            Signed up!
          </Button>
        ) : (
          <Button type="submit" className="btn btn-primary" value="Signup">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'eventSignupform',
})(EventSignupForm);
