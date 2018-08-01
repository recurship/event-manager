import React from 'react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import { Row } from 'reactstrap';
import FacebookIcon from 'react-share/lib/FacebookIcon';
import TwitterIcon from 'react-share/lib/TwitterIcon';

const SocialShare = () => {
  return (
    <div className="d-flex justify-content-center my-1">
      <FacebookShareButton className="mx-1" url={window.location.href}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className="mx-1" url={window.location.href}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );
};
export default SocialShare;
