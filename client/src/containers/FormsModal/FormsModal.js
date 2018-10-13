import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Label,
} from 'reactstrap';
import './FormsModal.css';

class FormsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      backdrop: true,
    };
    // this.submit = this.submit.bind(this);
    // this.toggle = this.toggle.bind(this);
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  submit = e => {
    //TODO, update user via id;
    this.toggle();
  };

  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          backdrop={this.state.backdrop}
        >
          <ModalHeader toggle={this.toggle}>Forms</ModalHeader>
          <ModalBody>
            <form id="edit-profile">
              {this.props.registrationForm.map((field, index) => (
                <div key={index} className="form-group">
                  {field.type !== 'dropdown' && (
                    <div>
                      <Label htmlFor="name">{field.label}</Label>
                      <Input
                        type={field.type}
                        name={field.name}
                        className="form-control"
                        value={field.value}
                      />
                    </div>
                  )}

                  {field.type === 'dropdown' && (
                    <div>
                      <Label htmlFor="name">{field.label}</Label>
                      <select name={field.name} className="form-control">
                        {field.value.map(option => (
                          <option value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              ))}
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
export default FormsModal;
