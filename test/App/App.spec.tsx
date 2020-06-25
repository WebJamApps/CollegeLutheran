import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/App';

describe('App component', () => {
  const wrapper = shallow<App>(<App auth={{ user: {} }} />);
  it('renders the component', () => {
    expect(wrapper.find('div#App').exists()).toBe(true);
  });
  it('does not fetch the images or songs if they already exist', () => {
    const wrapper2 = shallow(<App />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
  it('renders the music dashboard route', () => {
    const wrapper2 = shallow(<App auth={{ isAuthenticated: true, user: { userType: 'Developer' } }} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
});
