import React, { Component } from 'react';
import CommentListItem from './CommentListItem';
import { Comments } from '../../types/comments-types';

type Props = Comments;

const CommentList = (props: Props) => {
  return (
    <ul className="commentList">
      {props.comments.map(comment => (
        <CommentListItem comment={comment} />
      ))}
    </ul>
  );
};
export default CommentList;
