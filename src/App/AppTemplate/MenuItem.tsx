/* eslint-disable react/jsx-no-useless-fragment */
import type { Dispatch } from 'react';
import type { Auth, Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';
import { MakeMenuLink } from './MakeMenuLink';
import type { ImenuItem } from './menuItems';
import { GoogleButtons } from './GoogleButtons';

export const sortBulletins = (bulletin: Ibook[]) => {
  const sortedBulletins = bulletin.sort((a, b) => {
    if (a.created_at && b.created_at) {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      if (aTime > bTime) return -1;
      if (aTime < bTime) return 1;
    }
    return 0;
  });
  return sortedBulletins;
};

const setBulletin = (mItem: ImenuItem, books: any): ImenuItem => {
  const m = mItem;
  if (books) {
    const bulletins: any[] = books.filter((b: any) => b.comments === 'worshipbulletin');
    if (bulletins && bulletins.length > 0) {
      let link = sortBulletins(bulletins)[0].url;
      if (link === undefined) link = '';
      m.link = link;
    }
  }
  return m;
};

const continueMakeMenuItem = (
  mI: ImenuItem,
  index: number,
  auth: Auth,
  location: any,
  setMenuOpen: (arg0: boolean) => void,
  dispatch: Dispatch<unknown>,
): JSX.Element => {
  const { link, type } = mI;
  if (link !== '') return <MakeMenuLink key={index} menuItem={mI} index={index} setMenuOpen={setMenuOpen} />;
  if (type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) {
    return <GoogleButtons key={index} type="login" index={index} dispatch={dispatch} />;
  }
  if (type === 'googleLogout' && auth.isAuthenticated) {
    return <GoogleButtons key={index} type="logout" index={index} dispatch={dispatch} />;
  }
  return <></>;
};

interface ImenuItemProps {
  menu: ImenuItem,
  index: number, location: any, auth: any, books: any, setMenuOpen: any, dispatch: any
}
export function MenuItem(props:ImenuItemProps): JSX.Element {
  const {
    menu, index, location, auth, books, setMenuOpen, dispatch,
  } = props;
  const userRoles: string[] = commonUtils.getUserRoles();
  let m = menu;
  if (m.name === 'Bulletin') m = setBulletin(m, books);
  if (location.pathname === '/staff' && m.link === '/staff') return <></>;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return <></>;
  if (m.name === 'Admin Dashboard' && (!auth.isAuthenticated || !auth.user.userType || userRoles.indexOf(auth.user.userType) === -1)) return <></>;
  return continueMakeMenuItem(m, index, auth, location, setMenuOpen, dispatch);
}
