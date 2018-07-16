import { configure } from '@storybook/react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

//root styles
import 'bootstrap/dist/css/bootstrap.css';
import '../src/index.css';

const req = require.context('./../src/stories/', true, /\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

Enzyme.configure({ adapter: new Adapter() });
configure(loadStories, module);
