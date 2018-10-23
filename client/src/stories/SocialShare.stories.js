import React from 'react';
import { storiesOf } from '@storybook/react';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import FacebookIcon from 'react-share/lib/FacebookIcon';
import TwitterIcon from 'react-share/lib/TwitterIcon';

storiesOf('SocialShare', module).add('default', () => {
  const story = (
    <div className="d-flex justify-content-center">
      <FacebookShareButton className="mx-1" url={window.location.href}>
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>
      <TwitterShareButton className="mx-1" url={window.location.href}>
        <TwitterIcon size={32} round={true} />
      </TwitterShareButton>
    </div>
  );
  return story;
});
