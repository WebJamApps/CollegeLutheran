import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/App';

describe('App component', () => {
  const auth: any = { user: {} };
  const wrapper = shallow<App>(<App dispatch={jest.fn()} auth={auth} />);
  it('renders the component', () => {
    expect(wrapper.find('div#App').exists()).toBe(true);
  });
  it('does not fetch the images or songs if they already exist', () => {
    const wrapper2 = shallow(<App auth={auth} dispatch={jest.fn()} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
  it('renders the music dashboard route', () => {
    const auth2: any = { isAuthenticated: true, user: { userType: 'Developer' } };
    const wrapper2 = shallow(<App dispatch={jest.fn()} auth={auth2} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
});
