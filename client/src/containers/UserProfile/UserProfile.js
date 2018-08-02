import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchUserProfile } from '../../actions';
import Profile from './../../components/UserProfile/UserProfile';
import { AttendeeType } from '../../types/attendee-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    let userId = this.props.match.params.user_id;
    const { dispatch } = this.props;
    dispatch(fetchUserProfile(userId));
  }

  getUserDetails(): AttendeeType {
    let user = this.props.userProfile;
    return user ? user : null;
  }

  render() {
    const { user } = this.getUserDetails();
    return user ? (
      <div style={{ marginTop: '20px' }}>
        <Profile user={user} />
      </div>
    ) : null;
  }
}
const mapStateToProps = state => {
  const { userProfile } = state;
  return { userProfile };
};

export default connect(mapStateToProps)(UserProfile);
