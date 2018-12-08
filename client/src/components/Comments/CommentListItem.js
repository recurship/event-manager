import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import moment from 'moment';
import avatar from '../../../src/avatar.jpg';

class CommentListItem extends Component {
  render() {
    const comment = this.props.comment;
    return (
      <li key={comment.id}>
        <button
          type="button"
          className="close"
          title="delete"
          aria-hidden="true"
        >
          &times;
        </button>
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
