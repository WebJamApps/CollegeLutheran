import React, { Dispatch } from 'react';
import jwt from 'jsonwebtoken';
import type { Auth, Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';
import { MakeMenuLink } from './MakeMenuLink';
import type { MenuItem } from './menuItems';
import { GoogleButtons } from './GoogleButtons';
import type { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { authenticate } from './authenticate';
import superagent from 'superagent';

export interface GoogleBody {
  clientId: string,
  redirectUri: string,
  code: string,
  state(): string,
}

const continueMakeMenuItem = (mI: MenuItem,
  index: number, auth: Auth, location: any, setMenuOpen: (arg0: boolean) => void, dispatch: Dispatch<unknown>): JSX.Element | null => {
  const { link, type } = mI;
  if (link !== '') return <MakeMenuLink key={index} menuItem={mI} index={index} setMenuOpen={setMenuOpen} />;
  if (type === 'googleLogin' && !auth.isAuthenticated && location.pathname.includes('/staff')) {
    return <GoogleButtons key={index} type='login' index={index} dispatch={dispatch} />;
  }
  if (type === 'googleLogout' && auth.isAuthenticated) {
    return <GoogleButtons key={index} type='logout' index={index} dispatch={dispatch} />;
  }
  return null;

};

const sortBulletins = (bulletin: Ibook[]) => {
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

const setBulletin = (mItem: MenuItem, books: any): MenuItem => {
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

function makeMenuItem(menu: MenuItem,
  index: number, location: any, auth: any, books: any, setMenuOpen: any, dispatch: any): JSX.Element | null {
  const userRoles: string[] = commonUtils.getUserRoles();
  // const { location, auth } = view.props;
  let m = menu;
  if (m.name === 'Bulletin') m = setBulletin(m, books);
  if (location.pathname === '/staff' && m.link === '/staff') return null;
  if ((m.link === '/staff' || m.link === '/belief') && auth.isAuthenticated) return null;
  if (m.name === 'Admin Dashboard' && (!auth.isAuthenticated || !auth.user.userType || userRoles.indexOf(auth.user.userType) === -1)) return null;
  return continueMakeMenuItem(m, index, auth, location, setMenuOpen, dispatch);
}

async function setUser(res:{ token: string, email: string }, dispatch: Dispatch<unknown>): Promise<void> {
  console.log(res);
  try {
    const { sub } = jwt.verify(res.token || /* istanbul ignore next */'',
      process.env.HashString || /* istanbul ignore next */'') as any;
    const { body } = await superagent.get(`${process.env.BackendUrl}/user/${sub}`)
      .set('Accept', 'application/json').set('Authorization', `Bearer ${res.token}`);
    dispatch({ type: 'SET_USER', data: body });
  } catch (e){
    if ((e as Error).message === 'invalid signature'){
      const { body } = await superagent.post(`${process.env.BackendUrl}/user`)
        .send({ email: res.email })
        .set('Accept', 'application/json').set('Authorization', `Bearer ${res.token}`);
      dispatch({ type: 'SET_USER', data: body });
    }
  }
  window.location.assign('/admin');
}

async function responseGoogleLogin(
  response: GoogleLoginResponseOffline | GoogleLoginResponse,
  dispatch: Dispatch<unknown>,
): Promise<void> {
  const uri = window.location.href;
  const baseUri = uri.split('/')[2];
  const googleBody: GoogleBody = {
    clientId: process.env.GoogleClientId || /* istanbul ignore next */'',
    redirectUri: /* istanbul ignore next */process.env.NODE_ENV === 'production' ? `https://${baseUri}` : `http://${baseUri}`,
    code: `${response.code}`,
    /* istanbul ignore next */state() {
      const rand = Math.random().toString(36).substr(2);
      return encodeURIComponent(rand);
    },
  };
  try {
    const res = await authenticate(googleBody, dispatch);
    await setUser(res, dispatch);
  } catch (e) {
    console.log(`${(e as Error).message}`);
  }
}

function responseGoogleLogout(dispatch: Dispatch<unknown>): string {
  dispatch({ type: 'LOGOUT' });
  if (window.location.href.includes('/admin')) {
    window.location.assign('/staff');
    return 'assign';
  }
  window.location.reload(); return 'reload';
}

export default { continueMakeMenuItem, makeMenuItem, setBulletin, responseGoogleLogin, setUser, responseGoogleLogout };
