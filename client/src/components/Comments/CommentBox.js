import React, { Component } from 'react';

class CommentBox extends Component {
  render() {
    return (
      <form className="form-inline" onSubmit={this.props.onSubmit}>
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            name="comment"
            placeholder="Write a Comment..."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-success" type="submit" disabled>
            Post
          </button>
        </div>
      </form>
    );
  }
}
export default CommentBox;
