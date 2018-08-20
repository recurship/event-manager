import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import TimeAgo from 'react-timeago';

class CommentList extends Component {
  render() {
    return (
      <ul className="commentList">
        {this.props.comments.map(comment => (
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
              <Col sm="2" md="1" xs="2">
                <img
                  className="commenterImage"
                  src={
                    comment.commentedBy.avatar
                      ? comment.commentedBy.avatar
                      : 'http://placekitten.com/50/50'
                  }
                />
              </Col>
              <Col sm="10" md="9" xs="10" className="commentText">
                <strong>{comment.commentedBy.username}</strong>
                <p>{comment.comment}</p>
                <span className="date sub-text">
                  <TimeAgo date={comment.commentDatetime} />
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
