import menuUtils from '../../src/App/menuUtils';
import { MenuItem } from '../../src/App/menuItems';
import { Auth } from '../../src/redux/mapStoreToProps';

describe('menuUtils', () => {
  let r: JSX.Element | null;
  const viewStub: any = {
    googleButtons: () => true,
    makeMenuLink: () => true,
    props: {
      location: { pathname: '/' },
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
  it('handles menuItem for GoogleLogout', () => {
    const menuItem: MenuItem = {
      link: '/', type: 'googleLogout', auth: true, classname: '', iconClass: '', name: '',
    };
    const auth: Auth = {
      isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
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
    viewStub.props.auth = { isAuthenticated: true, token: '', user: { userType: 'booya' } };
    r = menuUtils.menuItem({
      name: 'Admin Dashboard', link: '/admin', type: '', auth: true, classname: '', iconClass: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
  it('Prevents access to Admin Dashboard when auth user userType is not set', () => {
    viewStub.props.auth = { isAuthenticated: true, token: '', user: { userType: '' } };
    r = menuUtils.menuItem({
      name: 'Admin Dashboard', link: '/admin', type: '', auth: true, classname: '', iconClass: '',
    },
    1, viewStub);
    expect(r).toBe(null);
  });
});
