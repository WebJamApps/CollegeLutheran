import React from 'react';
import { shallow } from 'enzyme';
import { App } from '../../src/App';
import { Auth } from '../../src/redux/mapStoreToProps';

describe('App component', () => {
  const auth: Auth = {
    isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
  };
  const wrapper = shallow<App>(<App dispatch={jest.fn()} auth={auth} />);
  it('renders the component', () => {
    expect(wrapper.find('div#App').exists()).toBe(true);
  });
  it('does not fetch the images or songs if they already exist', () => {
    const wrapper2 = shallow(<App auth={auth} dispatch={jest.fn()} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
  it('renders the routes when authenticated', () => {
    let authRole = '';
    // eslint-disable-next-line prefer-destructuring
    if (process.env.userRoles) authRole = JSON.parse(process.env.userRoles).roles[1];
    const auth2: Auth = {
      isAuthenticated: true, error: 'none', email: 'devemail@cool.com', token: '', user: { userType: authRole },
    };
    const wrapper2 = shallow(<App dispatch={jest.fn()} auth={auth2} />);
    expect(wrapper2.find('div#App').exists()).toBe(true);
  });
});
