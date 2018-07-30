import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import SocialShare from '../SocialShare/SocialShare';

const EventDescription = () => {
  return (
    <Row className="block-content text-justify">
      <Col md="9">
        This HTML file is a template. If you open it directly in the browser,
        you will see an empty page. You can add webfonts, meta tags, or
        analytics to this file. The build step will place the bundled scripts
        into the tag. To begin the development, run `npm start` or `yarn start`.
        To create a production bundle, use `npm run build` or `yarn build`.
      </Col>
      <Col md="3">
        <center>
          <h6>Organiser Contact</h6>
          <Button className="bg-success">Register here</Button>
          <SocialShare />
        </center>
      </Col>
    </Row>
  );
};
export default EventDescription;
