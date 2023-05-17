/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  handleEscapePress, handleKeyMenu, toggleMobileMenu, AppTemplate,
} from 'src/App/AppTemplate';

// import authUtils from '../../src/App/authUtils';
// import type { MenuItem } from '../../src/App/menuItems';

// const dFunc = () => { };
// const anyProp: any = {};
// const location: any = { pathname: '/' };
// const books:any = [];

describe('AppTemplate', () => {
  it('is defined', () => {
    expect(AppTemplate).toBeDefined();
  });
  // it('renders the component', () => {
  //   const { wrapper } = setup();
  //   expect(wrapper.find('div.page-host').exists()).toBe(true);
  // });
  // it('rerenders the component when menuOpen state changes', () => {
  //   const { wrapper } = setup();
  //   wrapper.setState({ menuOpen: true });
  //   expect(wrapper.find('div.open').length).toBe(1);
  // });
  // it('handles response from google login', async () => {
  //   authUtils.responseGoogleLogin = jest.fn(() => Promise.resolve(''));
  //   const wrapper2 = shallow<AppTemplate>(
  //     <AppTemplate
  //       books={books}
  //       dispatch={dFunc}
  //       location={location}
  //       match={anyProp}
  //       history={anyProp}
  //     >
  //       <div />
  //     </AppTemplate>,
  //   );
  //   const result = await wrapper2.instance().responseGoogleLogin({ code: '' });
  //   expect(result).toBe('');
  // });
  // it('handles response from google logout', () => {
  //   authUtils.responseGoogleLogout = jest.fn(() => '');
  //   const wrapper2 = shallow<AppTemplate>(
  //     <AppTemplate books={books} dispatch={dFunc} location={location} match={anyProp} history={anyProp}><div /></AppTemplate>,
  //   );
  //   const result = wrapper2.instance().responseGoogleLogout();
  //   expect(result).toBe('');
  // });
  // it('renders the login button', () => {
  //   const { wrapper } = setup();
  //   const loginButton = wrapper.instance().googleButtons('login', 'login');
  //   const rLogin = shallow(loginButton);
  //   expect(rLogin.find('div.googleLogin').length).toBe(1);
  // });
  // it('renders the logout button', () => {
  //   const { wrapper } = setup();
  //   const logoutButton = wrapper.instance().googleButtons('logout', 'logout');
  //   const rLogout = shallow(logoutButton);
  //   expect(rLogout.find('div.googleLogout').length).toBe(1);
  // });
  // it('closes the menu without navigating away from the react app', () => {
  //   document.body.innerHTML = '<button class="googleLogin"/><button class="googleLogout"/>';
  //   anyProp = { dispatch: () => Promise.resolve(true) };
  //   const aT = new AppTemplate(anyProp);
  //   aT.setState = () => { };
  //   const result = aT.close();
  //   expect(result).toBe(true);
  // });

  // it('does not closes the mobile menu on clicking Enter key', () => {
  //   anyProp = { dispatch: () => Promise.resolve(true) };
  //   const aT = new AppTemplate(anyProp);
  //   const result = aT.handleKeyPress({ key: 'Enter' });
  //   expect(result).toBe(null);
  // });
  // it('toggles the mobile menu on clicking Enter key', () => {
  //   anyProp = { dispatch: () => Promise.resolve(true) };
  //   const aT = new AppTemplate(anyProp);
  //   aT.toggleMobileMenu = () => true;
  //   const result = aT.handleKeyMenu({ key: 'Enter' });
  //   expect(result).toBe(true);
  // });
  // it('does not toggle the mobile menu on clicking Escape key', () => {
  //   anyProp = { dispatch: () => Promise.resolve(true) };
  //   const aT = new AppTemplate(anyProp);
  //   aT.toggleMobileMenu = () => true;
  //   const result = aT.handleKeyMenu({ key: 'Escape' });
  //   expect(result).toBe(null);
  // });
  // it('calls the makeMenu function', () => {
  //   const aT = new AppTemplate(anyProp);
  //   const menu: MenuItem = {
  //     classname: '', type: '', iconClass: '', link: '', name: '',
  //   };
  //   const index = 1;
  //   const result = aT.makeMenuLink(menu, index);
  //   expect(result.props.className).toBe('menu-item');
  // });
  // it('calls the makeMenu function for external link', () => {
  //   const aT = new AppTemplate(anyProp);
  //   const menu: MenuItem = {
  //     classname: '', type: '', iconClass: '', link: 'https://google.com', name: '',
  //   };
  //   const index = 1;
  //   const result = aT.makeMenuLink(menu, index);
  //   expect(result.props.className).toBe('menu-item');
  // });
  it('toggleMobileMenu', () => {
    const setMenuOpen = jest.fn();
    const menuOpen = true;
    toggleMobileMenu(menuOpen, setMenuOpen);
    expect(setMenuOpen).toHaveBeenCalledWith(false);
  });
  // it('handleKeyMenu', () => {
  //   const setMenuOpen = jest.fn();
  //   const e = { key: 'Enter' };

  //   handleKeyMenu(e, menuOpen, setMenuOpen);
  // });
  // it('handleEscapePress', () => {
  //   const e = { key: '' };
  //   const setMenuOpen = jest.fn();
  //   handleEscapePress(e, setMenuOpen);
  //   expect(setMenuOpen).toHaveBeenCalledWith(false);
  // });
});
