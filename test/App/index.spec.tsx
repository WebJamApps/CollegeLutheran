import { showAdminDashboard, checkIsAdmin } from 'src/App';

describe('App component', () => {
  it('showAdminDashboard when isAdmin', () => {
    const result = showAdminDashboard(true);
    expect(result).not.toBeNull();
  });
  it('checkIsAdmin', () => {
    const setIsAdmin = vi.fn();
    process.env.userRoles = JSON.stringify({ roles: ['tester'] });
    checkIsAdmin({
      error: '', token: 'token', isAuthenticated: true, user: { userType: 'tester', email: 'tester@tesing.com' },
    }, setIsAdmin);
    expect(setIsAdmin).toHaveBeenCalledWith(true);
  });
});
