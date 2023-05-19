import {
  ContinueMenuItem, checkIsAllowed, setBulletin, sortBulletins,
} from 'src/App/AppTemplate/SideMenuItem';
import renderer from 'react-test-renderer';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
  it('should call handleClose when link is clicked', () => {
    const props = {
      menu: { link: '/example' }, index: 1, type: '', handleClose: jest.fn(),
    };
  });
});
