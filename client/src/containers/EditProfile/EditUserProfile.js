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

class EditUserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrentUser();
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
  };

  getUserDetails(): AttendeeType {
    let user = this.props.userProfile;
    return user ? user : null;
  }

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
                  defaultValue={user.firstName}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="name">Last Name</Label>
                <Input
                  type="text"
                  name="lastname"
                  className="form-control"
                  defaultValue={user.lastName}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  type="text"
                  name="username"
                  className="form-control"
                  defaultValue={user.username}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  className="form-control"
                  defaultValue={user.email}
                />
              </div>
              <Button color="primary" type="submit">
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
