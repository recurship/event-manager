import { configure } from '@storybook/react';

//root styles
import 'bootstrap/dist/css/bootstrap.css';
import '../src/index.css';

const req = require.context('./../src/stories/', true, /\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
