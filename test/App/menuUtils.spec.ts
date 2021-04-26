/* eslint-disable security/detect-non-literal-fs-filename */
/* eslint-disable @typescript-eslint/no-explicit-any */
import menuUtils from '../../src/App/menuUtils';
import { Auth } from '../../src/redux/mapStoreToProps';

describe('menuUtils', () => {
  let r: JSX.Element | null,
    authRole = '';
  // eslint-disable-next-line prefer-destructuring
  if (process.env.userRoles) authRole = JSON.parse(process.env.userRoles).roles[1];
  const viewStub: any = {
    googleButtons: () => true,
    makeMenuLink: () => true,
    props: {
      books: [],
      location: { pathname: '/' },
      auth: { token: 'token', isAuthenticated: true, user: { userType: authRole } },
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
  it('handles menuItem for GoogleLogin', () => {
    viewStub.props.location.pathname = '/staff';
    const auth: Auth = {
      isAuthenticated: false, email: '', token: '', user: { userType: authRole }, error: '',
    };
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogin', auth: true, classname: '', iconClass: '', name: '',
    },
    1, auth, viewStub);
    expect(r).toBe(true);
  });
  it('handles menuItem for GoogleLogout', () => {
    const auth: Auth = {
      isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
    };
    r = menuUtils.continueMenuItem({
      link: '', type: 'googleLogout', auth: true, classname: '', iconClass: '', name: '',
    },
    1, auth, viewStub);
    expect(r).toBe(true);
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
  it('setBulletin', () => {
    viewStub.props.books = [{ comments: 'worshipbulletin', url: 'external' }, { comments: '', url: 'url' }];
    const menuItem:any = { link: '' };
    const newItem = menuUtils.setBulletin(menuItem, viewStub);
    expect(newItem.link).toBe('external');
  });
  it('setBulletin when no books', () => {
    viewStub.props.books = undefined;
    const menuItem:any = { link: '' };
    const newItem = menuUtils.setBulletin(menuItem, viewStub);
    expect(newItem.link).toBe('');
  });
  it('sets bulletin when no url is defined', () => {
    viewStub.props.books = [
      { comments: 'worshipbulletin' }, { comments: '' },
    ];
    const menuItem:any = { link: '' };
    const newItem = menuUtils.setBulletin(menuItem, viewStub);
    expect(newItem.link).toBe('');
  });
  it('setBulletin to correct sorted bulletin', () => {
    viewStub.props.books = [
      { comments: 'worshipbulletin', url: 'external', created_at: '2021-04-26T11:04:45.120Z' },
      { comments: 'worshipbulletin', url: 'external', created_at: '2020-04-26T11:04:45.120Z' },
      { comments: 'worshipbulletin', url: 'latest', created_at: '2022-04-26T11:04:45.120Z' },
      { comments: 'worshipbulletin', url: 'external', created_at: '2021-04-26T11:04:45.120Z' },
      { comments: '', url: 'url' },
    ];
    const menuItem:any = { link: '' };
    const newItem = menuUtils.setBulletin(menuItem, viewStub);
    expect(newItem.link).toBe('latest');
  });
});
