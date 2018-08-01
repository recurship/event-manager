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
import { getFullname } from '../../utils/utils';
import { Link } from 'react-router-dom';
import './EditProfileModal.css';
import { fetchCurrentEvent } from '../../actions';
import { connect } from 'react-redux';

class EditUserProfile extends React.Component {
  eventId: string;
  attendeeId: string;

  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.getCurrentEvent();
  }

  getCurrentEvent = () => {
    const eventId = this.props.match.params.event_id;
    this.eventId = eventId;
    this.attendeeId = this.props.match.params.attendee_id;
    const { dispatch } = this.props;
    dispatch(fetchCurrentEvent(eventId));
  };

  submit(e) {
    //TODO, update user via id;
    // route back to user profile
  }

  receiveUserDetails(user) {
    this.setState({ user });
  }
  render() {
    let { event } = this.props.currentEvent;
    const { user } = this.state;
    return (
      <div>
        <Card
          isOpen={this.state.modal}
          toggle={this.toggle}
          // className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <CardHeader toggle={this.toggle}>Edit Profile</CardHeader>
          <CardBody>
            <form id="edit-profile">
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
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  className="form-control"
                  value={getFullname(user)}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="userName">User Name</Label>
                <Input
                  type="text"
                  name="userName"
                  className="form-control"
                  value={user.username}
                />
              </div>
              <div className="form-group">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="text"
                  name="email"
                  className="form-control"
                  value={user.email}
                />
              </div>
            </form>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.submit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </CardFooter>
        </Card>
        {/* </Link> */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { currentEvent } = state;
  return { currentEvent };
};

export default connect(
  mapStateToProps,
  null
)(EditUserProfile);
