import React from 'react';
import { storiesOf } from '@storybook/react';
import { EMNavbar } from '../components/EMNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import { withInfo } from '@storybook/addon-info';

storiesOf('EMNavbar', module).add(
	'nav bar',
	withInfo(`
      Main Nav Bar component 
    
      ~~~js
      <EMNavbar />
      ~~~
    
    `)(() => (
		<Router>
			<EMNavbar />
		</Router>
	))
);
