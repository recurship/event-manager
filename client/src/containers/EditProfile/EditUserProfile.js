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
import './EditProfileModal.css';
import { fetchUserProfile, userProfileEdit } from '../../actions';
import { connect } from 'react-redux';
import { AttendeeType } from '../../types/attendee-types';
import { isEmpty, isEmail, isLowercase } from 'validator';

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentUser();
    this.state = {
      isValidated: false,
      errorFirstName: '',
      errorLastName: '',
      errorUserName: '',
      errorEmail: '',
    };
  }

  getCurrentUser = () => {
    const userId = this.props.match.params.user_id;
    const { dispatch } = this.props;
    dispatch(fetchUserProfile(userId));
  };

  submit = e => {
    e.preventDefault();
    const formValues = e.target;
    let formData = new FormData();
    formData.append('username', formValues.username.value);
    formData.append('first_name', formValues.firstname.value);
    formData.append('last_name', formValues.lastname.value);
    formData.append('email', formValues.email.value);
    const { dispatch } = this.props;
    dispatch(userProfileEdit(formData));
    dispatch(fetchUserProfile(this.props.match.params.user_id));
    this.props.history.push(`/users/${this.props.match.params.user_id}`);
  };

  getUserDetails(): AttendeeType {
    let user = this.props.userProfile;
    return user ? user : null;
  }

  checkEmail = value => {
    if (isEmpty(value)) {
      return '*Email is required';
    } else if (!isEmail(value)) {
      return '*Invalid Email';
    } else {
      return '';
    }
  };

  checkUsername = value => {
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
    switch (name) {
      case 'firstname':
        isEmpty(value)
          ? this.setState({
              errorFirstName: '*First name is required',
              isValidated: false,
            })
          : this.setState({ errorFirstName: '', isValidated: true });
        break;
      case 'lastname':
        isEmpty(value)
          ? this.setState({
              errorLastName: '*Last name is required',
              isValidated: false,
            })
          : this.setState({ errorLastName: '', isValidated: true });
        break;
      case 'username':
        let errorUserName = '';
        this.setState({
          errorUserName: this.checkUsername(value),
          isValidated: this.checkUsername(value) === '',
        });
        break;
      case 'email':
        this.setState({
          errorEmail: this.checkEmail(value),
          isValidated: this.checkEmail(value) === '',
        });
        break;
      default:
        this.setState({ isValidated: true });
    }
  };

  render() {
    const { user } = this.getUserDetails();
    return user ? (
      <div>
        <Card>
          <CardHeader>Edit Profile</CardHeader>
          <CardBody>
            <form id="edit-profile" onSubmit={this.submit}>
              <CardImg
                top
                width="40%"
                src={
                  'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180'
                }
                alt="User Profile Pic"
                className="user-avatar"
              />
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
          </CardBody>
        </Card>
      </div>
    ) : null;
  }
}
const mapStateToProps = state => {
  const { userProfile } = state;
  return { userProfile };
};

export default connect(mapStateToProps)(EditUserProfile);
