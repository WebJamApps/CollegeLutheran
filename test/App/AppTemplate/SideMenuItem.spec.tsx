import {
  ContinueMenuItem, MakeLink, checkIsAllowed, setBulletin, sortBulletins,
} from 'src/App/AppTemplate/SideMenuItem';
import { render } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';

vi.mock('react-redux', () => ({
  useSelector: vi.fn(),
  useDispatch: vi.fn(),
}));
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useLocation: vi.fn().mockReturnValue({ pathname: '/staff' }),
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
      handleClose: vi.fn(),
    };
    const { container } = render(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>);
    expect(container.firstChild?.nodeName).toBe('DIV');
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
      handleClose: vi.fn(),
    };
    const { container } = render(<GoogleOAuthProvider clientId=""><ContinueMenuItem {...props} /></GoogleOAuthProvider>);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
  it('renders anchor when type is not link', () => {
    const menu = {
      classname: '', type: '', iconClass: '', link: '/some-url', name: '', text: 'nav-link',
    };
    const index = 0;
    const type = '';
    const handleClose = vi.fn();
    const { container } = render(<MakeLink menu={menu} index={index} type={type} handleClose={handleClose} />);
    expect(container).toMatchSnapshot();
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
