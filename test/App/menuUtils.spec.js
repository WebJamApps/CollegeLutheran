import menuUtils from '../../src/App/menuUtils';

describe('menuUtils', () => {
  let r;
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
    r = menuUtils.menuItem({ link: '/staff', type: 'link', auth: true },
      1, viewStub);
    expect(r).toBe(null);
  });
  it('handles menuItem for login', () => {
    r = menuUtils.continueMenuItem({ link: '', type: 'googleLogin', auth: true },
      1, { pathname: '/staff' }, { isAuthenticated: false }, viewStub);
    expect(r).toBe(true);
  });
  it('handles menuItem for logout', () => {
    r = menuUtils.continueMenuItem({ link: '', type: 'googleLogout', auth: true },
      1, { pathname: '/staff' }, { isAuthenticated: true }, viewStub);
    expect(r).toBe(true);
  });
  it('hides staff menu item when on staff page', () => {
    viewStub.props.location.pathname = '/staff';
    r = menuUtils.menuItem({ link: '/staff', type: '', auth: true },
      1, viewStub);
    expect(r).toBe(null);
  });
});
