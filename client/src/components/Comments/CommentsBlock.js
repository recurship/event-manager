import React, { Component } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';

class CommentsBlock extends Component {
  render() {
    return (
      <div className="detailBox">
        <div className="titleBox">
          <label>Write something about this event</label>
        </div>
        <div className="actionBox">
          <CommentList comments={this.props.comments} />
          <CommentBox />
        </div>
      </div>
    );
  }
}

export default CommentsBlock;
