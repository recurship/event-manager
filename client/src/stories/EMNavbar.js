import React from 'react';
import { storiesOf } from '@storybook/react';
import { EMNavbar } from '../components/EMNavbar';
import {BrowserRouter as Router} from 'react-router-dom'

storiesOf('EMNavbar', module).add('nav bar', () => 
    <Router>
        <EMNavbar />
    </Router>
    );