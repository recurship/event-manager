import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import LocalStorageMock from './test/env-setup/mock-localstorage';

global.localStorage = LocalStorageMock;
configure({ adapter: new Adapter() });
