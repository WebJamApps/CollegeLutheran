import commonUtils from '../lib/commonUtils';
import { Auth } from '../redux/mapStoreToProps';

export interface MenuUtils {
  menuItem: (...args: any) => JSX.Element | null
}
function continueMenuItem(menu:
{ link: string; name?: string; type?: string; auth?: boolean }, index: number, location: { pathname: string | string[]; },
auth: { isAuthenticated: boolean; },
view: { props?: { location: string; auth: Auth; }; makeMenuLink?: any; googleButtons?: any; }): JSX.Element | null {
  if (menu.link !== '') return view.makeMenuLink(menu, index);
  if (menu.type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) return view.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
}

function menuItem(menu: { link: string; name?: string; type?: string; auth?: boolean },
  index: number, view: { props: { location: any; auth: Auth; }; }): JSX.Element | null {
  const userRoles: any[] = commonUtils.getUserRoles();
  const { location, auth } = view.props;
  if (location.pathname === '/staff' && menu.link === '/staff') return null;
  if ((menu.link === '/staff' || menu.link === '/belief') && auth.isAuthenticated) return null;
  if (menu.name === 'Admin Dashboard' && (!auth.isAuthenticated || userRoles.indexOf(auth.user.userType) === -1)) return null;
  return continueMenuItem(menu, index, location, auth, view);
}

export default { continueMenuItem, menuItem };
