import menuUtils from '../../src/App/menuUtils';

describe('menuUtils', () => {
  const controllerStub = {
    googleButtons: () => true,
    makeMenuLink: () => true,
    props: {
      location: { pathname: '/' },
      auth: { token: 'token', isAuthenticated: true, user: { userType: 'Developer' } },
      dispatch: () => Promise.resolve(true),
    },
  };
  it('handles menuItem for Developer', () => new Promise((done) => {
    const result = menuUtils.menuItem({ link: '/staff', type: 'link', auth: true },
      1, controllerStub);
    expect(result).toBe(null);
    done();
  }));
});
