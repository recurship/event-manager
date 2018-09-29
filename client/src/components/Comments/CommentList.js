import React, { Component } from 'react';
import CommentListItem from './CommentListItem';
const CommentList = props => {
  return (
    <ul className="commentList">
      {props.comments.map(comment => (
        <CommentListItem comment={comment} key={comment.id} />
      ))}
    </ul>
  );
};
export default CommentList;
