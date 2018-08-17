import React, { Component } from 'react';

class CommentBox extends Component {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder="Write a Comment..."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success">Post</button>
        </div>
      </form>
    );
  }
}
export default CommentBox;
