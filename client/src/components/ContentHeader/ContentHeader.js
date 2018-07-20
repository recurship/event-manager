import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class ContentHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Row className="block">
        <Col className="text-header">
          <h4>{this.props.heading}</h4>
        </Col>
      </Row>
    );
  }
}
export default ContentHeader;
