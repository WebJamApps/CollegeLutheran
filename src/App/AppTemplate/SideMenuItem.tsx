
import { Link, useLocation } from 'react-router-dom';
import {
  useContext, useEffect,
} from 'react';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import type { Ibook } from 'src/providers/utils';
import commonUtils from 'src/lib/commonUtils';
import { ContentContext } from 'src/providers/Content.provider';
import type { ImenuItem } from './menuConfig';
import { GoogleButtons } from './GoogleButtons';

export function IconAndText({ menu }: { menu: ImenuItem }): JSX.Element {
  return (
    <div style={{ display: 'inline' }}>
      <i className={`${menu.iconClass}`} />
      &nbsp;
      <span className="nav-item">{menu.name}</span>
    </div>
  );
}

interface ImakeLinkProps {
  menu: ImenuItem, index: number, type: string, handleClose: () => void
}
export function MakeLink(props: ImakeLinkProps): JSX.Element {
  const {
    menu, index, type, handleClose,
  } = props;
  return (
    <div key={index} className="menu-item">
      {type === 'Link' ? (
        <Link to={menu.link} className="nav-link" onClick={handleClose}>
          <IconAndText menu={menu} />
        </Link>
      )
        : (
          <a href={menu.link} className="nav-link" onClick={handleClose}>
            <IconAndText menu={menu} />
          </a>
        )}
    </div>
  );
}

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

export const setBulletin = (mItem: ImenuItem, books: any): ImenuItem => {
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

interface IcontinueMenuItemProps {
  menu: ImenuItem,
  index: number,
  auth: Iauth,
  pathname: string,
}
export const ContinueMenuItem = (props:IcontinueMenuItemProps): JSX.Element | null => {
  const {
    menu, index, auth, pathname,
  } = props;
  if (menu.type === 'googleLogin' && !auth.isAuthenticated && pathname === '/staff') {
    return <GoogleButtons key="googleLogin" type="login" index={index} />;
  }
  if (menu.type === 'googleLogout' && auth.isAuthenticated) {
    return <GoogleButtons key="googleLogout" type="logout" index={index} />;
  }
  return null;
};

export const checkIsAllowed = (menu: ImenuItem, auth: Iauth, userRoles: string[]) => {
  if (menu.auth && (!auth.isAuthenticated || userRoles.indexOf(auth.user.userType) === -1)) return false;
  return true;
};

interface IsideMenuItemProps {
  menu: ImenuItem, index: number,
  handleClose: () => void,
}
export function SideMenuItem(props: IsideMenuItemProps): JSX.Element | null {
  const {
    menu, index, handleClose,
  } = props;
  const { news: { newsContent }, getNews } = useContext(ContentContext);
  // eslint-disable-next-line no-void, react-hooks/exhaustive-deps
  useEffect(() => { void getNews(); }, []);
  const { auth } = useContext(AuthContext);
  const location = useLocation();
  const { pathname } = location;
  const userRoles: string[] = commonUtils.getUserRoles();
  const isAllowed = checkIsAllowed(menu, auth, userRoles);
  if (!isAllowed) return <> </>;
  let m = menu;
  if (m.name === 'Bulletin') {
    m = setBulletin(m, newsContent);
  }
  if (location.pathname === '/staff' && m.link === '/staff') return <> </>;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return <> </>;
  if (m.link) {
    return (
      <MakeLink
        menu={m}
        index={index}
        type="Link"
        handleClose={handleClose}
      />
    );
  }
  const cmiProps = {
    menu: m, index, auth, pathname, handleClose,
  };
  return <ContinueMenuItem {...cmiProps} />;
}
