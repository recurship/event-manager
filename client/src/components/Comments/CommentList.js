import React, { Component } from 'react';
import CommentListItem from './CommentListItem';
class CommentList extends Component {
  render() {
    return (
      <ul className="commentList">
        {this.props.comments.map(comment => (
          <CommentListItem comment={comment} />
        ))}
      </ul>
    );
  }
}
export default CommentList;
