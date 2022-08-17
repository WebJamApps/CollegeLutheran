import jwt from 'jsonwebtoken';
import type { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { authenticate } from './authenticate';
import superagent from 'superagent';
import type { Dispatch } from 'react';

export interface GoogleBody {
  clientId: string,
  redirectUri: string,
  code: string,
  state(): string,
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

export default { responseGoogleLogin, setUser, responseGoogleLogout };
