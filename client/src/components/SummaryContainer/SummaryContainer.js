import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class SummaryContainer extends Component<Props> {
  render() {
    return (
      <Col md="3">
        <Row>
          <Col md="2">
            <i className={this.props.iconName} />
          </Col>
          <Col md="10">
            {this.props.url === null ? (
              this.props.content
            ) : (
              <Link to={this.props.url}>
                <p className="text-dark">{this.props.content}</p>
              </Link>
            )}
          </Col>
        </Row>
      </Col>
    );
  }
}
export default SummaryContainer;
