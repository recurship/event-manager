import React from 'react';
import { storiesOf } from '@storybook/react';
import DropSearch from '../components/DropSearch/DropSearch';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';

const store = configureStore();
storiesOf('DropSearch', module).add('default', () => {
  const story = (
    <Provider store={store}>
      <DropSearch />
    </Provider>
  );
  return story;
});
