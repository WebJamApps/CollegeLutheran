import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import {
  sortBulletins, setBulletin, MenuItem, ContMakeMenuItem,
} from 'src/App/AppTemplate/MenuItem';
import type { ImenuItem } from 'src/App/AppTemplate/menuItems';
import commonUtils from 'src/lib/commonUtils';
import type { Iauth, Ibook } from 'src/redux/mapStoreToProps';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('MenuItem', () => {
  it('sorts the bulletins by date', () => {
    const bulletins = [{
      _id: 'a', type: '', created_at: '1972-01-03T00:00:00Z', title: 'bulletin1',
    },
    {
      _id: 'b', type: '', created_at: '1971-01-03T00:00:00Z', title: 'bulletin2',
    },
    {
      _id: 'b', type: '', created_at: '1973-01-03T00:00:00Z', title: 'bulletin2',
    },
    {
      _id: 'c', type: '', created_at: '1973-01-03T00:00:00Z', title: 'bulletin3',
    },
    {
      _id: 'd', type: '', created_at: '1974-01-03T00:00:00Z', title: 'bulletin4',
    },
    ];

    const results = sortBulletins(bulletins);
    expect(results[0]._id).toBe('d');
    expect(results[1]._id).toBe('b' || 'c');
    expect(results[2]._id).toBe('c' || 'b');
    expect(results[3]._id).toBe('a');
  });
  it('sets link to first bulletin listed', () => {
    const bArr = [{ comments: 'worshipbulletin', url: 'https://whatever.com' }] as Ibook[];
    const item = {
      classname: '', type: 'link', iconClass: '', link: '', name: '',
    };
    const results = setBulletin(item, bArr);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(results.link).toBe('https://whatever.com');
  });
  it('sets link for bulletin to empty string when url is undefined', () => {
    const bArr = [{ comments: 'worshipbulletin' }] as Ibook[];
    const item = {
      classname: '', type: 'link', iconClass: '', link: '', name: '',
    };
    const results = setBulletin(item, bArr);
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    expect(results.link).toBe('');
  });
  it('renders a empty MenuItem when we are already on the staff page', () => {
    const props = {
      menu: { link: '/staff' } as ImenuItem,
      index: 1,
      location: { pathname: '/staff' },
      auth: {} as Iauth,
      books: [] as Ibook[],
      setMenuOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const menuItem = renderer
      .create(<MenuItem {...props} />)
      .toJSON();
    expect(menuItem).toBeNull();
  });
  it('ContMakeMenuItem renders a login button when on the staff page and not already logged in', () => {
    commonUtils.getUserRoles = jest.fn(() => ['fake']);
    const props = {
      menuItem: { type: 'googleLogin', link: '' } as ImenuItem,
      index: 1,
      auth: { isAuthenticated: false } as Iauth,
      location: { pathname: '/staff' },
      setMenuOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const cmmi: any = renderer
      .create(
        <GoogleOAuthProvider clientId="">
          <BrowserRouter>
            <ContMakeMenuItem {...props} />
          </BrowserRouter>
        </GoogleOAuthProvider>).toJSON();
    expect(cmmi.props.className.includes('googleLogin')).toBe(true);
  });
  it('renders a logout button', () => {
    const props = {
      menuItem: { type: 'googleLogout', link: '' } as ImenuItem,
      index: 1,
      auth: { isAuthenticated: true } as Iauth,
      location: '',
      setMenuOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const cmmi: any = renderer
      .create(
        <GoogleOAuthProvider clientId="">
          <BrowserRouter>
            <ContMakeMenuItem {...props} />
          </BrowserRouter>
        </GoogleOAuthProvider>).toJSON();
    expect(cmmi.props.className.includes('googleLogout')).toBe(true);
  });
  it('returns empty menu item for beliefs page when logged in', () => {
    const props = {
      menu: { link: '/belief' } as ImenuItem,
      index: 1,
      auth: { isAuthenticated: true } as Iauth,
      location: { pathname: '/belief' },
      books: [] as Ibook[],
      setMenuOpen: jest.fn(),
      dispatch: jest.fn(),
    };
    const menuItem = renderer
      .create(<MenuItem {...props} />)
      .toJSON();
    expect(menuItem).toBeNull();
  });
});
