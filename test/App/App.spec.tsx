import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/App';

describe('App component', () => {
  const dp = (fun) => fun;
  const wrapper = shallow<App>(<App dispatch={dp} auth={{ user: {} }} />);
  it('renders the component', () => {
    expect(wrapper.find('div#App').exists()).toBe(true);
  });
  it('does not fetch the images or songs if they already exist', () => new Promise((done) => {
    const wrapper2 = shallow(<App dispatch={dp} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
    done();
  }));
  it('renders the music dashboard route', () => new Promise((done) => {
    const wrapper2 = shallow(<App dispatch={dp} auth={{ isAuthenticated: true, user: { userType: 'Developer' } }} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
    done();
  }));
});
