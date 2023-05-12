import renderer from 'react-test-renderer';
import store from 'src/redux/store';
import { App, showAdminDashboard, checkIsAdmin } from 'src/App';
import { Provider } from 'react-redux';
import commonUtils from 'src/lib/commonUtils';

describe('App component', () => {
  it('is defined', () => {
    expect(App).toBeDefined();
  });
  it('renders the component', () => {
    commonUtils.setTitleAndScroll = jest.fn();
    const href = 'http://localhost:7777';
    const reload = jest.fn();
    Object.defineProperty(window, 'location', {
      value: {
        href, assign: () => { }, reload, origin: href,
      },
      writable: true,
    });
    const app = renderer.create(<Provider store={store.store}><App /></Provider>).toJSON();
    expect(app).toMatchSnapshot();
  });
  it('showAdminDashboard when isAdmin', () => {
    const result = showAdminDashboard(true);
    expect(result).not.toBe(null);
  });
  it('checkIsAdmin', () => {
    const setIsAdmin = jest.fn();
    process.env.userRoles = JSON.stringify({ roles: ['tester'] });
    checkIsAdmin({
      error: '', token: 'token', isAuthenticated: true, user: { userType: 'tester', email: 'tester@tesing.com' },
    }, setIsAdmin);
    expect(setIsAdmin).toHaveBeenCalledWith(true);
  });
});
