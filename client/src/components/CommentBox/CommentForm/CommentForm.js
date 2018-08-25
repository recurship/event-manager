import React from 'react';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    const text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({ author: 'Some name', text: text });
    this.setState({ text: '' });
  };

  handleTextChange = e => {
    this.setState({ text: e.target.value });
  };

  render() {
    const name = 'Some Name';

    return (
      <div>
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <label>{name}</label>
          <input
            type="text"
            placeholder="Say something..."
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

export default CommentForm;
