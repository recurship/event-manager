import React, { Component } from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { addComment } from '../../actions';

class CommentsBlock extends Component {
  postComment = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(
      addComment(
        {
          comment: e.target.comment.value,
        },
        this.props.eventID
      )
    );
  };

  render() {
    return (
      <div className="detailBox">
        <div className="titleBox">
          <label>Write something about this event</label>
        </div>
        <div className="actionBox">
          <CommentList comments={this.props.comments} />
          <CommentBox onSubmit={this.postComment} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CommentsBlock);
