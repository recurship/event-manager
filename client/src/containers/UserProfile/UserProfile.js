import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchUserProfile } from '../../actions';
import Profile from './../../components/UserProfile/UserProfile';
import { AttendeeType } from '../../types/attendee-types';
import { Link } from 'react-router-dom';
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

  showEditButton = user => {
    const { token, currentUser } = this.props.userState;
    return token && currentUser.id === user.id ? (
      <Link to={`/users/${user.id}/edit`}>
        <Button id="edit-user" className="btn btn-default">
          <span className="fa fa-edit" />
        </Button>
      </Link>
    ) : null;
  };

  render() {
    const { user } = this.getUserDetails();

    return user ? (
      <div style={{ marginTop: '20px' }}>
        <div className="float-right mx-5">{this.showEditButton(user)}</div>
        <Profile user={user} />
      </div>
    ) : null;
  }
}
const mapStateToProps = state => {
  const { userProfile, userState } = state;
  return { userProfile, userState };
};

export default connect(mapStateToProps)(UserProfile);
