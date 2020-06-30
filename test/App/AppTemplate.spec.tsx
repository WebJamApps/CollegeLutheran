import React from 'react';
import { shallow } from 'enzyme';
import { AppTemplate } from '../../src/App/AppTemplate';
import authUtils from '../../src/App/authUtils';

const dFunc = () => { };
const location: any = { pathname: '/' };
const history: any = {};
const match: any = {};
function setup() {
  const props = { children: '<div></div>' };
  document.body.innerHTML = '<div class="page-content"></div>';
  const wrapper = shallow<AppTemplate>(<AppTemplate match={match} history={history} dispatch={dFunc} location={location}><div /></AppTemplate>);
  return { wrapper, props };
}

describe('AppTemplate', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-host').exists()).toBe(true);
  });
  it('rerenders the component when menuOpen state changes', () => {
    const { wrapper } = setup();
    wrapper.setState({ menuOpen: true });
    expect(wrapper.find('div.open').length).toBe(1);
  });
  it('handles response from google login', async () => {
    authUtils.responseGoogleLogin = jest.fn(() => Promise.resolve(true));
    const wrapper2 = shallow<AppTemplate>(<AppTemplate dispatch={dFunc} location={location} match={match} history={history}><div /></AppTemplate>);
    const result = await wrapper2.instance().responseGoogleLogin({});
    expect(result).toBe(true);
  });
  it('handles response from google logout', () => {
    authUtils.responseGoogleLogout = jest.fn(() => '');
    const wrapper2 = shallow<AppTemplate>(<AppTemplate dispatch={dFunc} location={location} match={match} history={history}><div /></AppTemplate>);
    const result = wrapper2.instance().responseGoogleLogout();
    expect(result).toBe('');
  });
  it('renders the login button', () => {
    const { wrapper } = setup();
    const loginButton = wrapper.instance().googleButtons('login', 'login');
    const rLogin = shallow(loginButton);
    expect(rLogin.find('div.googleLogin').length).toBe(1);
  });
  it('renders the logout button', () => {
    const { wrapper } = setup();
    const logoutButton = wrapper.instance().googleButtons('logout', 'logout');
    const rLogout = shallow(logoutButton);
    expect(rLogout.find('div.googleLogout').length).toBe(1);
  });
  it('closes the menu without navigating away from the react app', () => {
    document.body.innerHTML = '<button class="googleLogin"/><button class="googleLogout"/>';
    const aT = new AppTemplate({ dispatch: () => Promise.resolve(true) });
    aT.setState = () => { };
    const result = aT.close();
    expect(result).toBe(true);
  });
  it('toggles the mobile menu', () => {
    const { wrapper } = setup();
    wrapper.instance().setState = jest.fn();
    wrapper.update();
    wrapper.instance().toggleMobileMenu();
    expect(wrapper.instance().setState).toHaveBeenCalled();
  });
  it('closes the mobile menu on clicking escape key', () => {
    const aT = new AppTemplate({ dispatch: () => Promise.resolve(true) });
    aT.setState = jest.fn(() => true);
    const result = aT.handleKeyPress({ key: 'Escape' });
    expect(result).toBe(true);
  });
  it('does not closes the mobile menu on clicking Enter key', () => {
    const aT = new AppTemplate({ dispatch: () => Promise.resolve(true) });
    const result = aT.handleKeyPress({ key: 'Enter' });
    expect(result).toBe(null);
  });
  it('toggles the mobile menu on clicking Enter key', () => {
    const aT = new AppTemplate({ dispatch: () => Promise.resolve(true) });
    aT.toggleMobileMenu = () => true;
    const result = aT.handleKeyMenu({ key: 'Enter' });
    expect(result).toBe(true);
  });
  it('does not toggle the mobile menu on clicking Escape key', () => {
    const aT = new AppTemplate({ dispatch: () => Promise.resolve(true) });
    aT.toggleMobileMenu = () => true;
    const result = aT.handleKeyMenu({ key: 'Escape' });
    expect(result).toBe(null);
  });
});
