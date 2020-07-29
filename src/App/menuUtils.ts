import { Auth } from '../redux/mapStoreToProps';
import commonUtils from '../lib/commonUtils';
import { MenuItem } from './menuItems';
import type { AppTemplate } from './AppTemplate';

const continueMenuItem = (menu: MenuItem,
  index: number, auth: Auth, view: AppTemplate): JSX.Element | null => {
  if (menu.type === 'googleLogin' && !auth.isAuthenticated) return view.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
};

function menuItem(menu: MenuItem,
  index: number, view: AppTemplate): JSX.Element | null {
  const userRoles: string[] = commonUtils.getUserRoles();
  const { location, auth } = view.props;
  if (location.pathname === '/staff' && menu.link === '/staff') return null;
  if ((menu.link === '/staff' || menu.link === '/belief') && auth.isAuthenticated) return null;
  if (menu.name === 'Admin Dashboard' && (!auth.isAuthenticated || !auth.user.userType || userRoles.indexOf(auth.user.userType) === -1)) return null;
  if (menu.type === 'link' && menu.link.includes('/') && location.pathname.includes('/')) return view.makeMenuLink(menu, index);
  return continueMenuItem(menu, index, auth, view);
}

export default { continueMenuItem, menuItem };
