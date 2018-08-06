import React from 'react';

import MetaTags from 'react-meta-tags';

const MetaTagsComponent = props => {
  return (
    <MetaTags>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta
        property="og:image"
        content={
          props.image ? props.image : 'http://via.placeholder.com/350x150'
        }
      />
      <meta property="og:url" content={props.url} />
    </MetaTags>
  );
};
export default MetaTagsComponent;
