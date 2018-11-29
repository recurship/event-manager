import React from 'react';
import { ClipLoader } from 'react-spinners';
import { LoaderTypes } from '../../types/event-form-types';

const withLoader = Component => {
  return function wrappedWithLoader({ isFetching, ...props }) {
    return (
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
};

withLoader.propTypes = LoaderTypes;
export default withLoader;
