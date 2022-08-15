import React from 'react';
import type { Auth, Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';
import { MakeMenuLink } from './MakeMenuLink';
import type { MenuItem } from './menuItems';

const continueMenuItem = (mI:MenuItem,
  index: number, auth: Auth, location:any, setMenuOpen:any): JSX.Element | null => {
  const { link, type } = mI;
  if (link !== '') return <MakeMenuLink menuItem={ mI } index = { index } setMenuOpen = { setMenuOpen }/>;
  if (type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) return view.googleButtons('login', index);
  if (type === 'googleLogout' && auth.isAuthenticated) return view.googleButtons('logout', index);
  return null;
};

const sortBulletins = (bulletin:Ibook[]) => {
  const sortedBulletins = bulletin.sort((a, b) => {
    if (a.created_at && b.created_at){
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      if (aTime > bTime) return -1;
      if (aTime < bTime) return 1;
    }
    return 0;
  });
  return sortedBulletins;
};

const setBulletin = (mItem:MenuItem, books:any): MenuItem => {
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
  index: number, location:any, auth:any, books:any, setMenuOpen:any): JSX.Element | null {
  const userRoles: string[] = commonUtils.getUserRoles();
  // const { location, auth } = view.props;
  let m = menu;
  if (m.name === 'Bulletin') m = setBulletin(m, books);
  if (location.pathname === '/staff' && m.link === '/staff') return null;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return null;
  if (m.name === 'Admin Dashboard' && (!auth.isAuthenticated || !auth.user.userType || userRoles.indexOf(auth.user.userType) === -1)) return null;
  return continueMenuItem(m, index, auth, location, setMenuOpen);
}

export default { continueMenuItem, menuItem, setBulletin };
