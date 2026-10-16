import utils, { isCurrentPage } from 'src/App/AppTemplate/utils';

describe('Apptemplate utils', () => {
  it('showHav is false when route and link are both staff', () => {
    expect(utils.showNav(true, { pathname: '/staff' }, { link: '/staff' }, { isAuthenticated: false })).toBe(false);
  });
  it('showHav is false when link is belief and isAuthenticated', () => {
    expect(utils.showNav(true, { pathname: '/home' }, { link: '/belief' }, { isAuthenticated: true })).toBe(false);
  });
  it('isCurrentPage matches paths accurately and normalizes trailing slashes', () => {
    expect(isCurrentPage('/history', '/history')).toBe(true);
    expect(isCurrentPage('/history/', '/history')).toBe(true);
    expect(isCurrentPage('/history', '/history/')).toBe(true);
    expect(isCurrentPage('/', '/')).toBe(true);
    expect(isCurrentPage('/staff', '/calendar')).toBe(false);
    expect(isCurrentPage('', '/history')).toBe(false);
    expect(isCurrentPage('/history', '')).toBe(false);
  });
});
