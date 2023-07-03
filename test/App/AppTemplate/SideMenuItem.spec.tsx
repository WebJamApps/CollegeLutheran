import {
  ContinueMenuItem, MakeLink, checkIsAllowed, setBulletin, sortBulletins,
} from 'src/App/AppTemplate/SideMenuItem';
import renderer from 'react-test-renderer';
import { GoogleOAuthProvider } from '@react-oauth/google';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn().mockReturnValue({ pathname: '/staff' }),
}));

describe('SideMenuItem', () => {
  it('sorts bulletins in order', () => {
    const bulletins = [{
      type: '1', _id: 'a', title: 'b1', created_at: '2023-05-16T10:30:00Z',
    },
    {
      type: '3', _id: 'c', title: 'b3', created_at: '2023-07-16T10:30:00Z',
    },
    {
      type: '2', _id: 'b', title: 'b2', created_at: '2023-06-16T10:30:00Z',
    }];
    sortBulletins(bulletins);
    expect(bulletins[0]._id).toBe('c');
    expect(bulletins[1]._id).toBe('b');
    expect(bulletins[2]._id).toBe('a');
  });
  it('sets bulletins', () => {
    const mItem = {
      classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const books = [
      { comments: 'worshipbulletin', url: 'https://example.com/bulletin1' },
      { comments: 'worshipbulletin', url: 'https://example.com/bulletin2' },
    ];
    const newMItem = setBulletin(mItem, books);
    expect(newMItem.link).toBe('https://example.com/bulletin1');
  });
  it('sets link to empty string when no bulletins', () => {
    const mItem = {
      classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const books = [
      { comments: 'worshipbulletin' },
      { comments: 'worshipbulletin' },
    ];
    const result = setBulletin(mItem, books);
    expect(result.link).toBe('');
  });
  it('shows login button when on staff page and not already authenticated', () => {
    const props = {
      menu: {
        classname: '', type: 'googleLogin', iconClass: '', link: '', name: '',
      },
      index: 1,
      auth: {
        isAuthenticated: false,
        error: '',
        token: '',
        user: {
          userType: '',
          email: '',
        },
      },
      pathname: '/staff',
      handleClose: jest.fn(),
    };
    const result: any = renderer.create(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>).toJSON();
    console.log(result);
    expect(result.type).toBe('div');
  });
  it('shows logout button when authenticated', () => {
    const props = {
      menu: {
        classname: '', type: 'googleLogout', iconClass: '', link: '', name: '',
      },
      index: 1,
      auth: {
        isAuthenticated: true,
        error: '',
        token: '',
        user: {
          userType: '',
          email: '',
        },
      },
      pathname: '',
      handleClose: jest.fn(),
    };
    const result: any = renderer.create(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>).toJSON();
    console.log(result);
    expect(result.type).toBe('div');
  });
  it('renders anchor when type is not link', () => {
    const menu = {
      classname: '', type: '', iconClass: '', link: '/some-url', name: '', text: 'nav-link',
    };
    const index = 0;
    const type = '';
    const handleClose = jest.fn();
    const result = renderer.create(<MakeLink menu={menu} index={index} type={type} handleClose={handleClose} />).toJSON();
    expect(result).toMatchSnapshot();
  });
  it('returns null when path and menu link are staff', () => {
    const menu = {
      auth: true, classname: '', type: '', iconClass: '', link: '', name: '',
    };
    const auth = {
      isAuthenticated: true, user: { userType: 'admin', email: '' }, error: '', token: '',
    };
    const userRoles = ['', ''];
    const result = checkIsAllowed(menu, auth, userRoles);
    expect(result).toBe(false);
  });
});
