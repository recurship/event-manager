import React from 'react';
import CommentList from './CommentList/CommentList';
import CommentForm from './CommentForm/CommentForm';
import { connect } from 'react-redux';

const CommentBox = props => {
  const onCommentSubmit = e => {};

  const commentsArray = [
    [
      {
        avatarUrl: 'some_url',
        name: 'some name',
        text: 'some comment',
      },
    ],
  ];

  const isUserLoggedIn = Object.keys(props.userState.currentUser).length > 0;

  if (isUserLoggedIn) {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <CommentForm onCommentSubmit={onCommentSubmit} />
        <CommentList comments={comments} />
      </div>
    );
  } else {
    return (
      <div className="commentBox">
        <h2>Comments</h2>
        <h3>Please Sign In/Register to post comments</h3>
        <CommentList comments={comments} />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CommentBox);
