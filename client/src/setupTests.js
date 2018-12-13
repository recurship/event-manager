import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import './test/env-setup/mock-localstorage';

configure({ adapter: new Adapter() });
