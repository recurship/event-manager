import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class SummaryContainer extends Component {
  render() {
    return this.props.content || this.props.url ? (
      <Col md="3">
        <Row>
          <Col md="2">
            {this.props.logo ? (
              <img id="organisation-logo" src={this.props.logo} />
            ) : (
              <i className={this.props.iconName} />
            )}
          </Col>
          <Col md="10">
            {this.props.url === null ? (
              <p className="text-dark font-weight-light">
                {this.props.content}
              </p>
            ) : this.props.externalLink ? (
              <a href={this.props.url} target="blank">
                <p className="text-dark font-weight-light">
                  {this.props.content}
                </p>
              </a>
            ) : (
              <Link to={this.props.url}>
                <p className="text-dark font-weight-light">
                  {this.props.content}
                </p>
              </Link>
            )}
          </Col>
        </Row>
      </Col>
    ) : null;
  }
}
export default SummaryContainer;
