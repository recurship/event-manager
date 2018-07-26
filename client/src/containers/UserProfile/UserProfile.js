import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchEvents } from '../../actions';
import Profile from './../../components/UserProfile/UserProfile';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.fetchEvents();
  }

  fetchEvents() {
    const { dispatch } = this.props;
    dispatch(fetchEvents());
  }
  getUserDetails() {
    const {
        event_id: eventId = null,
        attendee_id: attendeeId = null,
      } = this.props.match.params,
      { events = [] } = this.props;
    let event, attendee;
    event = events.find(event => event.id == eventId);
    if (event && event.attendees)
      attendee = event.attendees.find(att => (att.id = attendeeId));

    return attendee ? attendee : null;
  }
  render() {
    const user = this.getUserDetails();
    return user ? (
      <div style={{ marginTop: '20px' }}>
        <Profile user={user} />
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({ ...state.events });
export default connect(mapStateToProps)(UserProfile);
