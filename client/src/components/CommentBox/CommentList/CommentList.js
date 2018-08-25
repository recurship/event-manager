import React from 'react';
import Comment from './Comment/Comment';

const CommentList = props => {
  const commentNodes = props.comments.map(comment => {
    return (
      <Comment
        key={comment.name}
        avatarUrl={comment.avatarUrl}
        name={comment.name}
        text={comment.text}
      />
    );
  });

  return (
    <div>
      Comment List
      {commentNodes}
    </div>
  );
};

export default CommentList;
