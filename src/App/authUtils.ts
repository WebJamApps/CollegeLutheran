import superagent from 'superagent';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import jwt from 'jsonwebtoken';
import type { Dispatch } from 'react';
import type { GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';
import authenticate, { logout } from './authActions';
import type { GoogleBody } from './AppTypes';
import type { AppTemplate } from './AppTemplate';

export interface AuthUtils {
  setUser: (view: AppTemplate) => Promise<string>,
  responseGoogleLogin: (response: GoogleLoginResponseOffline | GoogleLoginResponse, view: AppTemplate) => Promise<string>,
  responseGoogleFailLogin: (response: unknown) => string,
  responseGoogleLogout: (dispatch: Dispatch<unknown>) => boolean,
}
async function setUser(view: AppTemplate): Promise<string> {
  const { auth, dispatch } = view.props;
  let decoded: any, user;
  try {
    decoded = jwt.verify(auth.token || /* istanbul ignore next */'',
      process.env.HashString || /* istanbul ignore next */'');
  } catch (e) { return `${(e as Error).message}`; }
  if (decoded.user) dispatch({ type: 'SET_USER', data: decoded.user });
  else {
    try {
      user = await superagent.get(`${process.env.BackendUrl}/user/${decoded.sub}`)
        .set('Accept', 'application/json').set('Authorization', `Bearer ${auth.token}`);
      dispatch({ type: 'SET_USER', data: user.body });
      //   const newToken = jwt.encode(decoded, process.env.HashString || /* istanbul ignore next */'');
      // dispatch({ type: 'GOT_TOKEN', data: { token: newToken, email: auth.email } });
<<<<<<< HEAD
    } catch (e) {
      store.addNotification({
        title: (e as Error).message,
        message: 'Error, cannot dispatch',
        type: 'warning',
        insert: 'top',
        container: 'top-right',
        animationIn: ['animate__animated animate__fadeIn'],
        animationOut: ['animate__animated animate__fadeOut'],
        dismiss: {
          duration: 5000,
          onScreen: true,
        },
      });
      return `${(e as Error).message}`;
    }
=======
    } catch (e) { return `${(e as Error).message}`; }
>>>>>>> addbef3a0d47293b95d5e37f8ec16732c53a579c
  }
  window.location.reload();
  window.location.assign('/admin');
  return 'user set';
}
async function responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse, view: AppTemplate): Promise<string> {
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
    return `${(e as Error).message}`;
  }
  return setUser(view);
}

function responseGoogleFailLogin(response: unknown): string {
  return `${response}`;
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
