import menuUtils from '../../src/App/menuUtils';

describe('menuUtils', () => {
  let r: any;
  const viewStub = {
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
    1, viewStub as any);
    expect(r).toBe(null);
  });
  it('handles menuItem for login', () => {
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogin', auth: true, classname: '', iconClass: '', name: '',
    },
    1, { pathname: '/staff' }, { isAuthenticated: false, user: { userType: '' } }, viewStub as any);
    expect(r).toBe(true);
  });
  it('handles menuItem for logout', () => {
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogout', auth: true, classname: '', iconClass: '', name: '',
    },
    1, { pathname: '/staff' }, { isAuthenticated: true, user: { userType: 'Developer' } }, viewStub as any);
    expect(r).toBe(true);
  });
  it('hides staff menu item when on staff page', () => {
    viewStub.props.location.pathname = '/staff';
    r = menuUtils.menuItem({
      link: '/staff', type: '', auth: true, classname: '', iconClass: '', name: '',
    },
    1, viewStub as any);
    expect(r).toBe(null);
  });
  it('Prevents access to Admin Dashboard when auth user userType is incorrect', () => {
    viewStub.props.auth = { isAuthenticated: true, token: '', user: { userType: 'booya' } };
    r = menuUtils.menuItem({
      name: 'Admin Dashboard',
      link: '/admin',
      type: '',
      auth: true,
      classname: '',
      iconClass: '',
    },
    1, viewStub as any);
    expect(r).toBe(null);
  });
});
