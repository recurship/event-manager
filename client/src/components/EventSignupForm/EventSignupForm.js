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
      {props.fields &&
        props.fields.map((field, i) => (
          <Field
            type="text"
            key={i}
            placeholder={placeHolder[field.label]}
            className="form-control"
            name={field.label}
            component={renderField}
          />
        ))}

      <Button type="submit" className="btn btn-primary" value="Signup">
        Submit
      </Button>
    </form>
  );
};

export default reduxForm({
  form: 'eventSignupform',
})(EventSignupForm);
