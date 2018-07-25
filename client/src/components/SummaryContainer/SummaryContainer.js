import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class SummaryContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Col md="3">
        <Row>
          <Col md="2">
            <i className={this.props.iconName} />
          </Col>
          <Col md="10">{this.props.content}</Col>
        </Row>
      </Col>
    );
  }
}
export default SummaryContainer;
