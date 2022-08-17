import React from 'react';
import { Link } from 'react-router-dom';

export const MakeMenuLink = ({ menuItem, index, setMenuOpen }: any) => {
  const { link, iconClass, name } = menuItem;
  if (link.includes('http')) {
    return (
            <div key={index} className="menu-item">
                <a href={link} target="_blank" rel="noreferrer" className="nav-link" onClick={() => setMenuOpen(false)}>
                    <i className={`${iconClass}`} />
                    &nbsp;
                    <span className="nav-item">{name}</span>
                </a>
            </div>
    );
  }
  return (
        <div key={index} className="menu-item">
            <Link to={link} className="nav-link" onClick={() => setMenuOpen(false)}>
                <i className={`${iconClass}`} />
                &nbsp;
                <span className="nav-item">{name}</span>
            </Link>
        </div>
  );

};