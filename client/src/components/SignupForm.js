import React, { Component } from "react";
import { Input, Button } from "reactstrap";
import { isEmpty, isLowercase, isEmail, isLength } from "validator";

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      username: "",
      email: "",
      password: ""
    };
  }
  isRequired = value => !!value;
  isUserNameValid = value =>
    isLowercase(value) && isLength(value, { min: 3, max: 12 });
  isValidPassword = value => isLength(value, { min: 6, max: 16 });
  handleChange = e => {
    let { name, value } = e.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <div className="form-group">
          <Input
            onChange={this.handleChange}
            value={this.state.fullname}
            type="text"
            placeholder="Full Name"
            name="fullname"
          />
          {this.isRequired(this.state.fullname) ? null : (
            <span className="text-danger">* Is Required</span>
          )}
        </div>

        <div className="form-group">
          <Input
            onChange={this.handleChange}
            type="text"
            placeholder="User Name"
            name="username"
          />
          {this.isUserNameValid(this.state.username) ? null : (
            <span className="text-danger">* Must be valid username</span>
          )}
        </div>

        <div className="form-group">
          <Input
            onChange={this.handleChange}
            type="email"
            placeholder="Email"
            name="email"
          />
          {isEmail(this.state.email) ? null : (
            <span className="text-danger">* Must be a valid email</span>
          )}
        </div>

        <div className="form-group">
          <Input
            onChange={this.handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
          {this.isValidPassword(this.state.password) ? null : (
            <span className="text-danger">* Must be atleast 6 digits long</span>
          )}
        </div>
        <Button type="submit">Sign Up </Button>
      </form>
    );
  }
}
export default SignupForm;
