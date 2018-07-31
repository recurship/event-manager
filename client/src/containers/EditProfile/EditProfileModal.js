import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
  CardImg,
} from 'reactstrap';
import { getFullname } from '../../utils/utils';
import './EditProfileModal.css';

class ModalExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
      user: {},
    };

    this.submit = this.submit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  submit(e) {
    //TODO, update user via id;
    this.toggle();
  }

  receiveUserDetails(user) {
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;
