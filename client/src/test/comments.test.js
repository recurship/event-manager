// Login Form Full DOM Rendering Test
import React from 'react';
import CommentsBlock from '../components/Comments/CommentsBlock';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import store from '../store/configureStore';
import { comments as eventComments } from '../stories/mock-data/data';

const WrappedComponent = ({ comments }) => {
  return (
    <Provider store={store}>
      <CommentsBlock event={{ comments: comments }} />
    </Provider>
  );
};

describe('<CommentsBlock />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<WrappedComponent comments={[]} />);
  });

  it('Component should render without crashing', async () => {
    expect(wrapper.find('.detailBox').length).toEqual(1);
    wrapper.unmount();
  });

  it('Component should render comments', () => {
    wrapper = mount(<WrappedComponent comments={eventComments} />);
    expect(wrapper.find('ul.commentList').length).toEqual(1);
    wrapper.unmount();
  });
});
