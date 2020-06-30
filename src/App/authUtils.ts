import superagent from 'superagent';
import jwt from 'jwt-simple';
import { Dispatch } from 'react';
import authenticate, { logout } from './authActions';
import { AppProps, GoogleBody } from './AppTypes';

export interface AuthUtils {
  setUser: (...args: any) => any,
  responseGoogleLogin: (...args: any) => any,
  responseGoogleFailLogin: (...args: any) => any,
  responseGoogleLogout: (...args: any) => any,
}
async function setUser(view: { props: AppProps; }): Promise<string> {
  const { auth, dispatch } = view.props;
  let decoded: { user: any; sub: any; }, user: any;
  try {
    decoded = jwt.decode(auth.token || '',
      process.env.HashString || /* istanbul ignore next */'');
  } catch (e) { return `${e.message}`; }
  if (decoded.user) dispatch({ type: 'SET_USER', data: decoded.user });
  else {
    try {
      user = await superagent.get(`${process.env.BackendUrl}/user/${decoded.sub}`)
        .set('Accept', 'application/json').set('Authorization', `Bearer ${auth.token}`);
      dispatch({ type: 'SET_USER', data: user.body });
      const newToken = jwt.encode(decoded, process.env.HashString || /* istanbul ignore next */'');
      dispatch({ type: 'GOT_TOKEN', data: { token: newToken, email: auth.email } });
    } catch (e) { return `${e.message}`; }
  }
  window.location.reload();
  window.location.assign('/admin');
  return 'user set';
}
async function responseGoogleLogin(response: { code: any; }, view: { props: AppProps; }): Promise<string> {
  const uri = window.location.href;
  const baseUri = uri.split('/')[2];
  const body: GoogleBody = {
    clientId: process.env.GoogleClientId || /* istanbul ignore next */'',
    redirectUri: /* istanbul ignore next */process.env.NODE_ENV === 'production' ? `https://${baseUri}` : `http://${baseUri}`,
    code: `${response.code}`,
    /* istanbul ignore next */state() {
      const rand = Math.random().toString(36).substr(2);
      return encodeURIComponent(rand);
    },
  };
  try { await authenticate(body, view.props); } catch (e) {
    return `${e.message}`;
  }
  return setUser(view);
}

function responseGoogleFailLogin(response: any): any {
  console.log(response);// eslint-disable-line no-console
  return false;
}

function responseGoogleLogout(dispatch: Dispatch<unknown>): string {
  logout(dispatch);
  if (window.location.href.includes('/admin')) {
    window.location.assign('/staff');
    return 'assign';
  }
  window.location.reload(); return 'reload';
}

export default {
  responseGoogleLogin, responseGoogleLogout, responseGoogleFailLogin, setUser,
};
