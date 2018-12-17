import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';
import './EditProfileModal.css';
import {
  fetchUserProfile,
  userProfileEdit,
  userProfilePictureUpload,
} from '../../actions';
import { EditUserForm } from '../../components/EditUserForm/EditUserForm';

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
    const { dispatch } = this.props;
    dispatch(userProfileEdit(e.target));
    dispatch(fetchUserProfile(this.props.match.params.user_id));
    this.props.history.push(`/users/${this.props.match.params.user_id}`);
  };

  handleImageUpload = e => {
    const { dispatch } = this.props;
    const file = e.target.files[0];
    if (!file) return;

    dispatch(userProfilePictureUpload(file));
  };

  getUserDetails() {
    const user = this.props.userProfile;
    return user ? user : null;
  }

  render() {
    const { user } = this.getUserDetails();
    return user ? (
      <div>
        <Card>
          <CardHeader>Edit Profile</CardHeader>
          <CardBody>
            <EditUserForm
              handleSubmit={this.submit}
              handleImageUpload={this.handleImageUpload}
              user={user}
            />
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
