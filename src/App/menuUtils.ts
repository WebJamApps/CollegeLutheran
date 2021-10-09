import type { Auth, Ibook } from '../redux/mapStoreToProps';
import commonUtils from '../lib/commonUtils';
import type { MenuItem } from './menuItems';
import type { AppTemplate } from './AppTemplate';

const continueMenuItem = (menu: MenuItem,
  index: number, auth: Auth, view: AppTemplate): JSX.Element | null => {
  const { location } = view.props;
  if (menu.link !== '') return view.makeMenuLink(menu, index);
  if (menu.type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) return view.googleButtons('login', index);
  if (menu.type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
};

const sortBulletins = (bulletin:Ibook[]) => {
  const sortedBulletins = bulletin.sort((a, b) => {
    const aTime = new Date(a.created_at).getTime();
    const bTime = new Date(b.created_at).getTime();
    if (aTime > bTime) return -1;
    if (aTime < bTime) return 1;
    return 0;
  });
  return sortedBulletins;
};

const setBulletin = (mItem:MenuItem, view:AppTemplate): MenuItem => {
  const { books } = view.props;
  const m = mItem;
  if (books) {
    const bulletins:any[] = books.filter((b) => b.comments === 'worshipbulletin');
    if (bulletins && bulletins.length > 0) {
      let link = sortBulletins(bulletins)[0].url;
      if (link === undefined) link = '';
      m.link = link;
    }
  }
  return m;
};

function menuItem(menu: MenuItem,
  index: number, view: AppTemplate): JSX.Element | null {
  const userRoles: string[] = commonUtils.getUserRoles();
  const { location, auth } = view.props;
  let m = menu;
  if (m.name === 'Bulletin') m = setBulletin(m, view);
  if (location.pathname === '/staff' && m.link === '/staff') return null;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return null;
  if (m.name === 'Admin Dashboard' && (!auth.isAuthenticated || !auth.user.userType || userRoles.indexOf(auth.user.userType) === -1)) return null;
  return continueMenuItem(m, index, auth, view);
}

export default { continueMenuItem, menuItem, setBulletin };
