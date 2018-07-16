import React from 'react';
import { Input } from 'reactstrap';

const renderField = props => {
  const {
    input,
    placeholder = '',
    type,
    className = '',
    meta: { touched, error, warning },
  } = props;
  return (
    <div className="form-group">
      <Input
        className={className}
        {...input}
        placeholder={placeholder}
        type={type}
      />
      {props.children}
      {touched &&
        ((error && <span className="text-danger">{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  );
};

export default renderField;
