import { configure } from '@storybook/react';
/*
function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
*/

const req = require.context('../src/stories', true, /\.js$/)

function loadStories() {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
