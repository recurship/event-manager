import React from 'react';
import { Row, Col } from 'reactstrap';
import SocialShare from '../SocialShare/SocialShare';

const DescriptionContainer = props => {
  return (
    <Row className="block-content text-justify">
      <Col md="9">
        {props.description ? (
          <p className="text-dark font-weight-light">{props.description}</p>
        ) : null}
      </Col>
      <Col md="3" className="p-3 rounded">
        <Row>
          <Col md="2">
            <span className="fa fa-share-alt fa-2x my-2" />
          </Col>
          <Col md="10">
            <p className="text-left">
              <small>Share with your Friends &amp; Colleagues</small>
            </p>
          </Col>
        </Row>
        <center>
          <SocialShare />
        </center>
      </Col>
    </Row>
  );
};
export default DescriptionContainer;
