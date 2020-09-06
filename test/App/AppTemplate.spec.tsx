/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { AppTemplate } from '../../src/App/AppTemplate';
import authUtils from '../../src/App/authUtils';
import { MenuItem } from '../../src/App/menuItems';

const dFunc = () => { };
let anyProp: any = {};
const location: any = { pathname: '/' };
function setup() {
  const props = { children: '<div></div>' };
  document.body.innerHTML = '<div class="page-content"></div>';
  const wrapper = shallow<AppTemplate>(<AppTemplate match={anyProp} history={anyProp} dispatch={dFunc} location={location}><div /></AppTemplate>);
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
    authUtils.responseGoogleLogin = jest.fn(() => Promise.resolve(''));
    const wrapper2 = shallow<AppTemplate>(<AppTemplate dispatch={dFunc} location={location} match={anyProp} history={anyProp}><div /></AppTemplate>);
    const result = await wrapper2.instance().responseGoogleLogin({ code: '' });
    expect(result).toBe('');
  });
  it('handles response from google logout', () => {
    authUtils.responseGoogleLogout = jest.fn(() => '');
    const wrapper2 = shallow<AppTemplate>(<AppTemplate dispatch={dFunc} location={location} match={anyProp} history={anyProp}><div /></AppTemplate>);
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
    anyProp = { dispatch: () => Promise.resolve(true) };
    const aT = new AppTemplate(anyProp);
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
    anyProp = { dispatch: () => Promise.resolve(true) };
    const aT = new AppTemplate(anyProp);
    aT.setState = jest.fn(() => true);
    const result = aT.handleKeyPress({ key: 'Escape' });
    expect(result).toBe(true);
  });
  it('does not closes the mobile menu on clicking Enter key', () => {
    anyProp = { dispatch: () => Promise.resolve(true) };
    const aT = new AppTemplate(anyProp);
    const result = aT.handleKeyPress({ key: 'Enter' });
    expect(result).toBe(null);
  });
  it('toggles the mobile menu on clicking Enter key', () => {
    anyProp = { dispatch: () => Promise.resolve(true) };
    const aT = new AppTemplate(anyProp);
    aT.toggleMobileMenu = () => true;
    const result = aT.handleKeyMenu({ key: 'Enter' });
    expect(result).toBe(true);
  });
  it('does not toggle the mobile menu on clicking Escape key', () => {
    anyProp = { dispatch: () => Promise.resolve(true) };
    const aT = new AppTemplate(anyProp);
    aT.toggleMobileMenu = () => true;
    const result = aT.handleKeyMenu({ key: 'Escape' });
    expect(result).toBe(null);
  });
  it('calls the makeMenu function', () => {
    const aT = new AppTemplate(anyProp);
    const menu: MenuItem = {
      classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const index = 1;
    const result = aT.makeMenuLink(menu, index);
    expect(result).toBeTruthy();
  });
});
