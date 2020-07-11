import menuUtils from '../../src/App/menuUtils';
import { Auth } from '../../src/redux/mapStoreToProps';
import { MenuItem } from '../../src/App/menuItems';
// import { AppTemplate } from '../../src/App/AppTemplate';

describe('menuUtils', () => {
  let r: JSX.Element | null;
  const viewStub: any = {
    googleButtons: () => true,
    makeMenuLink: () => true,
    props: {
      location: { pathname: '/staff' },
      auth: { token: 'token', isAuthenticated: true, user: { userType: 'Developer' } },
      dispatch: () => Promise.resolve(true),
    },
  };
  it('handles menuItem for Developer', () => {
    r = menuUtils.menuItem({
      link: '/staff', type: 'link', auth: true, classname: '', iconClass: '', name: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
  it('handles menuItem for login', () => {
    const menuItem: MenuItem = {
      link: '/staff', type: 'googleLogin', auth: true, classname: '', iconClass: '', name: '',
    };
    const auth: Auth = {
      isAuthenticated: false, email: '', token: '', user: { userType: 'Developer' }, error: '',
    };
    const result = menuUtils.continueMenuItem(menuItem,
      1, auth, viewStub);
    expect(result).toBe(true);
  });
  it('handles menuItem for GoogleLogout', () => {
    const menuItem: MenuItem = {
      link: '/', type: 'googleLogout', auth: true, iconClass: '', classname: '', name: '',
    };
    const auth: Auth = {
      isAuthenticated: true, email: '', token: '', user: { userType: '' }, error: '',
    };
    const result = menuUtils.continueMenuItem(menuItem,
      1, auth, viewStub);
    expect(result).toBe(true);
  });
  it('hides staff menu item when on staff page', () => {
    viewStub.props.location.pathname = '/staff';
    r = menuUtils.menuItem({
      link: '/staff', type: '', auth: true, classname: '', iconClass: '', name: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
  it('Prevents access to Admin Dashboard when auth user userType is incorrect', () => {
    const menuItem: MenuItem = {
      name: 'Admin Dashboard',
      link: '/admin',
      type: '',
      auth: true,
      classname: '',
      iconClass: '',
    };
    const auth: Auth = {
      isAuthenticated: true, email: '', token: '', user: { userType: 'booya' }, error: '',
    };
    const result = menuUtils.continueMenuItem(menuItem,
      1, auth, viewStub);
    expect(result).toBe(null);
  });
});
