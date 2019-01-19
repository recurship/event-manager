import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { fetchUserProfile } from '../../actions';
import Profile from './../../components/UserProfile/UserProfile';
import { AttendeeType } from '../../types/attendee-types';
import { Link } from 'react-router-dom';
import { BaseReduxPropTypes, BaseReducerPropsTypes } from '../../types/base-props-types';

type Props = BaseReduxPropTypes & BaseReducerPropsTypes & {
  match: {
    params: {
      user_id: string,
    }
  },
  userProfile: AttendeeType,
}

class UserProfile extends Component<Props> {
  constructor(props) {
    super(props);
    this.fetchUserProfile();
  }

  fetchUserProfile() {
    const userId = this.props.match.params.user_id;
    const { dispatch } = this.props;
    dispatch(fetchUserProfile(userId));
  }

  getUserDetails(): AttendeeType | null {
    const user = this.props.userProfile;
    return user ? user : null;
  }

  isUserLoggedIn = (user) => {
    const { token, currentUser } = this.props.userState;
    return !!(token && currentUser.id === user.id);
  };

  showEditButton = user => {
    return this.isUserLoggedIn(user) ? (
      <Link to={`/users/${user.id}/edit`}>
        <Button id="edit-user" className="btn btn-default">
          <span className="fa fa-edit" />
        </Button>
      </Link>
    ) : null;
  };

  render() {
    const user = this.getUserDetails();
    return user ? (
      <div style={{ marginTop: '20px' }}>
        <div className="float-right mx-5">{this.showEditButton(user)}</div>
        <Profile user={user} isUserLoggedIn={this.isUserLoggedIn(user)} />
      </div>
    ) : null;
  }
}
const mapStateToProps = state => {
  const { userProfile, userState } = state;
  return { userProfile, userState };
};

export default connect(mapStateToProps)(UserProfile);
