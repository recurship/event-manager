import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Row, Col, Button } from 'reactstrap';
import FacebookIcon from 'react-share/lib/FacebookIcon';
import TwitterIcon from 'react-share/lib/TwitterIcon';
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
          <Row className="col-md-6 col-md-offset-3 my-2">
            <FacebookShareButton className="mx-1" url={window.location.href}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>
            <TwitterShareButton className="mx-1" url={window.location.href}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </Row>
        </center>
      </Col>
    </Row>
  );
};
export default EventDescription;
