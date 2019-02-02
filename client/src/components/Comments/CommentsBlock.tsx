import React from 'react';
import CommentBox from './CommentBox';
import CommentList from './CommentList';
import { connect } from 'react-redux';
import { addComment } from '../../actions';
import { BaseReduxPropTypes, BaseReducerPropsTypes } from '../../types/base-props-types';
import { EventComments } from '../../types/comments-types';

type Props = BaseReduxPropTypes & BaseReducerPropsTypes & EventComments & {
  eventID: string
};

const postComment = (e, dispatch, eventID) => {
  e.preventDefault();
  dispatch(
    addComment(
      {
        comment: e.target.comment.value,
      },
      eventID
    )
  );
};

const CommentsBlock = (props: Props) => {
  const { comments } = props.event;
  return (
    <div className="detailBox">
      <div className="titleBox">
        <label>Write something about this event</label>
      </div>
      <div className="actionBox">
        {comments && comments.length ? (
          <CommentList comments={comments} />
        ) : null}
        {props.userState.token ? (
          <CommentBox onSubmit={(e) => postComment(e, props.dispatch, props.eventID)} />
        ) : (
            <div>Sign in to comment here...</div>
          )}
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(CommentsBlock);
