import { Link, useLocation } from 'react-router-dom';
import {
  useContext, useEffect, useState,
} from 'react';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import { type Ibook, stewardshipEnabled } from 'src/providers/utils';
import commonUtils from 'src/lib/commonUtils';
import { ContentContext } from 'src/providers/Content.provider';
import type { ImenuItem } from './menuConfig';
import { GoogleButtons } from './GoogleButtons';
import utils, { isCurrentPage } from './utils';

export function IconAndText({ menu }: { menu: ImenuItem }) {
  return (
    <div style={{ display: 'inline' }}>
      <i className={`${menu.iconClass}`} />
      &nbsp;
      <span className="nav-item">{menu.name}</span>
    </div>
  );
}

interface ImakeLinkProps {
  menu: ImenuItem, index: number, type: string, handleClose: () => void, isSubItem?: boolean,
}
export function MakeLink(props: ImakeLinkProps) {
  const {
    menu, index, type, handleClose, isSubItem,
  } = props;
  const itemClassName = `menu-item${isSubItem ? ' menu-sub-item' : ''}`;
  return (
    <div key={index} className={itemClassName}>
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
  const m = { ...mItem };
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
export const ContinueMenuItem = (props: IcontinueMenuItemProps) => {
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
  return !menu.auth || (auth.isAuthenticated && userRoles.indexOf(auth.user.userType) !== -1);
};

interface IsideMenuItemProps {
  menu: ImenuItem, index: number,
  handleClose: () => void,
  isSubItem?: boolean,
  menuOpen?: boolean,
}
export function SideMenuItem(props: IsideMenuItemProps) {
  const {
    menu, index, handleClose, isSubItem, menuOpen,
  } = props;
  const { news: { newsContent }, getNews, content } = useContext(ContentContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { (async () => { await getNews(); })(); }, []);
  const { auth } = useContext(AuthContext);
  const location = useLocation() || { pathname: '' };
  const pathname = location.pathname || '';
  const userRoles: string[] = commonUtils.getUserRoles();
  const isAllowed = checkIsAllowed(menu, auth, userRoles);

  const containsCurrentPage = Boolean(
    menu.children?.some((child) => isCurrentPage(pathname, child.link)),
  );
  const [isOpen, setIsOpen] = useState(containsCurrentPage);

  useEffect(() => {
    if (containsCurrentPage) {
      setIsOpen(true);
    }
  }, [containsCurrentPage, pathname, menuOpen]);

  if (menu.type === 'group' && menu.children) {
    const listId = `menu-group-${menu.classname || index}`;
    return (
      <div key={index} className="menu-group-container">
        <div className="menu-item menu-group-header">
          <button
            type="button"
            className="menu-group-button"
            aria-label={menu.name}
            aria-expanded={isOpen}
            aria-controls={listId}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen((prev) => !prev);
            }}
          >
            <span className="menu-group-title">
              <i className={menu.iconClass} aria-hidden="true" />
              &nbsp;&nbsp;
              <span className="group-name">{menu.name}</span>
            </span>
            <i
              className={`fas fa-chevron-${isOpen ? 'down' : 'right'} group-arrow`}
              aria-hidden="true"
            />
          </button>
        </div>
        <div
          id={listId}
          className="group-items"
          hidden={!isOpen}
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          {menu.children.map((child, childIndex) => (
            <SideMenuItem
              key={child.name || childIndex}
              menu={child}
              index={childIndex}
              handleClose={handleClose}
              isSubItem
              menuOpen={menuOpen}
            />
          ))}
        </div>
      </div>
    );
  }

  let m = menu;
  if (m.name === 'Bulletin') {
    m = setBulletin(m, newsContent);
  }
  // Stewardship is seasonal: hide its nav link unless an admin has toggled the
  // stewardship content doc's `enabled` flag on (default off → hidden). (CollegeLutheran#707)
  if (m.name === 'Stewardship' && !stewardshipEnabled(content)) return null;
  if (!utils.showNav(isAllowed, location, m, auth)) return null;
  if (m.link) {
    return (
      <MakeLink
        menu={m}
        index={index}
        type="Link"
        handleClose={handleClose}
        isSubItem={isSubItem}
      />
    );
  }
  const cmiProps = {
    menu: m, index, auth, pathname, handleClose,
  };
  return <ContinueMenuItem {...cmiProps} />;
}
