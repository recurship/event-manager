import React, { Component } from 'react';
import {
  Col,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import moment from 'moment';
import avatar from '../../../src/avatar.jpg';

class CommentListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
    };
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  };
  render() {
    const comment = this.props.comment;
    return (
      <li key={comment.id}>
        <div className="settings-btn">
          <ButtonDropdown
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
            className="comment-options"
          >
            <DropdownToggle className="dots-btn">
              <i className="fa fa-ellipsis-v" aria-hidden="true" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-pencil fa-fw" /> Edit
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <i className="fa fa-trash-o fa-fw" /> Delete
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        {/* <div className="btn-group open">
          <a
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            href="#"
          >
k          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="#">
                <i className="fa fa-pencil fa-fw" /> Edit
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-trash-o fa-fw" /> Delete
              </a>
            </li>
            <li>
              <a href="#">
                <i className="fa fa-ban fa-fw" /> Ban
              </a>
            </li>
            <li className="divider" />
            <li>
              <a href="#">
                <i className="fa fa-unlock" /> Make admin
              </a>
            </li>
          </ul>
        </div> */}
        <Row>
          <Col sm="4" md="2" xs="4" lg="2">
            <img
              className="commenterImage"
              src={
                comment.commentedBy.avatar ? comment.commentedBy.avatar : avatar
              }
            />
          </Col>
          <Col sm="8" md="10" xs="8" lg="10" className="commentText">
            <strong>
              {comment.commentedBy.username
                ? comment.commentedBy.username
                : 'Anonymous'}
            </strong>
            <p>{comment.comment}</p>
            <span className="date sub-text">
              {moment(comment.commentDatetime).fromNow()}
            </span>
          </Col>
        </Row>
      </li>
    );
  }
}
export default CommentListItem;
