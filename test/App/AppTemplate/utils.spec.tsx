import utils from 'src/App/AppTemplate/utils';

describe('Apptemplate utils', () => {
  it('showHav is false when route and link are both staff', () => {
    expect(utils.showNav(true, { pathname: '/staff' }, { link: '/staff' }, { isAuthenticated: false })).toBe(false);
  });
  it('showHav is false when link is belief and isAuthenticated', () => {
    expect(utils.showNav(true, { pathname: '/home' }, { link: '/belief' }, { isAuthenticated: true })).toBe(false);
  });
});
