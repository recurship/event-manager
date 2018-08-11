import React from 'react';
import {
  Button,
  Input,
  Label,
  CardImg,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from 'reactstrap';
import { isEmpty, isEmail, isLowercase } from 'validator';

export class EditUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      errorFirstName: '',
      errorLastName: '',
      errorUserName: '',
      errorEmail: '',
      picture: '',
    };
  }

  validationCases = {
    firstname: value => {
      let errFirstName = this.checkFirstName(value);
      this.setState({
        errorFirstName: errFirstName,
        isValidated: errFirstName === '',
      });
    },
    lastname: value => {
      let errLastName = this.checkLastName(value);
      this.setState({
        errorLastName: errLastName,
        isValidated: errLastName === '',
      });
    },
    username: value => {
      let errUserName = this.checkUserName(value);
      this.setState({
        errorUserName: errUserName,
        isValidated: errUserName === '',
      });
    },
    email: value => {
      let errEmail = this.checkEmail(value);
      this.setState({
        errorEmail: errEmail,
        isValidated: errEmail === '',
      });
    },
  };

  checkFirstName = value => {
    return isEmpty(value) ? '*First name is required' : '';
  };

  checkLastName = value => {
    return isEmpty(value) ? '*Last name is required' : '';
  };

  checkEmail = value => {
    if (isEmpty(value)) {
      return '*Email is required';
    } else if (!isEmail(value)) {
      return '*Invalid Email';
    } else {
      return '';
    }
  };

  checkUserName = value => {
    if (isEmpty(value)) {
      return '*Username is required';
    } else if (!isLowercase(value)) {
      return '*Username must be in lowercase';
    } else {
      return '';
    }
  };

  handleInputChange = e => {
    const { name, value } = e.target;
    this.validationCases[name](value);
  };

  render() {
    const { user, handleSubmit, handleImageUpload } = this.props;
    console.log('rednder triggered: ', user);
    return (
      <form id="edit-profile" onSubmit={handleSubmit}>
        <div className="user-avatar">
          <CardImg
            top
            width="40%"
            src={
              user.avatar ||
              'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
            }
            alt="User Profile Pic"
          />
          <div
            className="overlay"
            onClick={() => {
              document.getElementById('user-thumb').click();
            }}
          >
            <Input type="file" id="user-thumb" onChange={handleImageUpload} />
            Update Picture <span className="fa fa-upload" />
          </div>
        </div>
        <div className="form-group">
          <Label htmlFor="name">First Name</Label>
          <Input
            type="text"
            name="firstname"
            className="form-control"
            onChange={this.handleInputChange}
            defaultValue={user.firstName}
          />
          <span className="text-danger">{this.state.errorFirstName}</span>
        </div>
        <div className="form-group">
          <Label htmlFor="name">Last Name</Label>
          <Input
            type="text"
            name="lastname"
            className="form-control"
            onChange={this.handleInputChange}
            defaultValue={user.lastName}
          />
          <span className="text-danger">{this.state.errorLastName}</span>
        </div>
        <div className="form-group">
          <Label htmlFor="userName">User Name</Label>
          <Input
            type="text"
            name="username"
            className="form-control"
            onChange={this.handleInputChange}
            defaultValue={user.username}
          />
          <span className="text-danger">{this.state.errorUserName}</span>
        </div>
        <div className="form-group">
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            name="email"
            className="form-control"
            onChange={this.handleInputChange}
            defaultValue={user.email}
          />
          <span className="text-danger">{this.state.errorEmail}</span>
        </div>
        <Button
          id="submit_button"
          color="primary"
          type="submit"
          disabled={!this.state.isValidated}
        >
          Submit
        </Button>
      </form>
    );
  }
}
