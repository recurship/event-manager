import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
class CommentList extends Component {
  render() {
    return (
      <ul className="commentList">
        {this.props.comments.map(comment => (
          <li>
            <button
              type="button"
              className="close"
              title="delete"
              aria-hidden="true"
            >
              &times;
            </button>
            <Row>
              <Col sm="2" md="1" xs="2">
                <img
                  className="commenterImage"
                  src="http://placekitten.com/50/50"
                />
              </Col>
              <Col sm="10" md="9" xs="10" className="commentText">
                <strong>{comment.commented_by}</strong>
                <p>{comment.comment}</p>
                <span className="date sub-text">
                  {comment.comment_datetime}
                </span>
              </Col>
            </Row>
          </li>
        ))}
      </ul>
    );
  }
}
export default CommentList;
