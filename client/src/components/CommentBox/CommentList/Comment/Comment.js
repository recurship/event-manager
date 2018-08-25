import React from 'react';

const Comment = props => {
  return (
    <div className="comment">
      <div>
        <img src={props.avatarUrl} className="avatar" />
      </div>
      <div className="name">{props.name}</div>
      <div className="text">{props.text}</div>
    </div>
  );
};

export default Comment;
