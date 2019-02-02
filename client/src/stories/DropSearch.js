import React from 'react';
import { storiesOf } from '@storybook/react';
import DropSearch from '../components/DropSearch/DropSearch';
import '../containers/Login/Login.css';
import { withInfo } from '@storybook/addon-info';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../store/configureStore';

storiesOf('DropSearch', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'DropSearch',
    withInfo(`
      DropSearch component gives an overview of the individual 
      functionality of the search component provided in the applicaiton.
    
      ~~~js
      <DropSearch />
      ~~~
    
    `)(() => {
      const story = (
        <Router>
          <DropSearch />
        </Router>
      );
      return story;
    })
  );
