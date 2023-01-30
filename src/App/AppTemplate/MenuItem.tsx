/* eslint-disable react/jsx-no-useless-fragment */
import type { Dispatch } from 'react';
import type { Iauth, Ibook } from '../../redux/mapStoreToProps';
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

export const setBulletin = (mItem: ImenuItem, books: Ibook[]): ImenuItem => {
  const m = mItem;
  if (books) {
    const bulletins: any[] = books.filter((b: any) => b.comments === 'worshipbulletin');
    if (bulletins && bulletins.length > 0) {
      let link = sortBulletins(bulletins)[0].url;
      if (typeof link !== 'string') link = '';
      m.link = link;
    }
  }
  return m;
};
export interface IcontMakeMenuItem {
  menuItem: ImenuItem,
  index: number,
  auth: Iauth,
  location: any,
  setMenuOpen: (arg0: boolean) => void,
  dispatch: Dispatch<unknown>,
}
export const ContMakeMenuItem = (props: IcontMakeMenuItem): JSX.Element => {
  const {
    menuItem,
    index,
    auth,
    location,
    setMenuOpen,
    dispatch,
  } = props;
  const { link, type } = menuItem;
  if (link !== '') {
    return (
      <MakeMenuLink
        key={index}
        menuItem={menuItem}
        index={index}
        setMenuOpen={setMenuOpen}
      />
    );
  }
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
  index: number, location: { pathname:string }, auth: Iauth,
  books: Ibook[], setMenuOpen: (arg0:boolean)=>void, dispatch: Dispatch<unknown>
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
  const cProps = {
    index, auth, location, setMenuOpen, dispatch,
  };
  return <ContMakeMenuItem {...cProps} menuItem={m} />;
}
