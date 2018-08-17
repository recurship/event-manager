import React, { Component } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

const dummyComments = [
  {
    id: 1,
    comment: 'Hello, its a comment',
    comment_datetime: '5 hours ago',
    commented_by: 'user',
  },
  {
    id: 1,
    comment: 'second comment',
    comment_datetime: '2 days ago',
    commented_by: 'super user',
  },
];
class CommentsBlock extends Component {
  render() {
    return (
      <div className="detailBox">
        <div className="titleBox">
          <label>Write something about this event</label>
        </div>
        <div className="actionBox">
          <CommentList comments={dummyComments} />
          <CommentBox />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
