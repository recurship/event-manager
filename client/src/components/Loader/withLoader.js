import React, { Component } from 'react';
import { connect } from 'redux';
import { ClipLoader } from 'react-spinners';

const withLoader = Component => {
  return ({ isFetching, ...props }) => (
    <div>
      {isFetching ? (
        <div
          className="sweet-loading"
          style={{
            display: 'flex',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ClipLoader
            className={'MoonLoader'}
            sizeUnit={'px'}
            size={30}
            color={'green'}
            loading={isFetching}
          />
        </div>
      ) : (
        <Component {...props} />
      )}
    </div>
  );
};

export default withLoader;
