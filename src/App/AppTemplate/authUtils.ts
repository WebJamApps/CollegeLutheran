import superagent from 'superagent';
import jwt from 'jsonwebtoken';
import type { Dispatch } from 'react';
import type { GoogleLoginResponseOffline, GoogleLoginResponse } from 'react-google-login';
import { logout, authenticate } from './authActions';
import type { GoogleBody } from '../AppTypes';
// import type { AppTemplate } from '../AppTemplate';

<<<<<<< HEAD
export interface AuthUtils {
  setUser: (view: AppTemplate) => Promise<string>,
  responseGoogleLogin: (response: GoogleLoginResponseOffline | GoogleLoginResponse, view: AppTemplate) => Promise<string>,
  responseGoogleFailLogin: (response: unknown) => string,
  responseGoogleLogout: (dispatch: Dispatch<unknown>) => boolean,
}
async function setUser(view: AppTemplate, email:string): Promise<string> {
  console.log('setting the user now');
  const { auth: { token }, dispatch } = view.props;
  let data;
=======
// export interface AuthUtils {
//   setUser: (view: AppTemplate) => Promise<string>,
//   responseGoogleLogin: (response: GoogleLoginResponseOffline | GoogleLoginResponse, view: AppTemplate) => Promise<string>,
//   responseGoogleFailLogin: (response: unknown) => string,
//   responseGoogleLogout: (dispatch: Dispatch<unknown>) => boolean,
// }

async function setUser(auth:any, dispatch:any): Promise<string> {
  // const { auth: { token }, dispatch } = view.props;
  const { token } = auth;
  let decoded: any, user;
>>>>>>> 3a3a9a2 (WIP Refacoring - Errors Fixed)
  try {
    const { user } = jwt.verify(token || /* istanbul ignore next */'',
      process.env.HashString || /* istanbul ignore next */'') as any;
    data = user;
  } catch (e){console.log(e);}
  if (data && data._id) {
    console.log('user has been decoded from token');
    dispatch({ type: 'SET_USER', data });
  } else {
    const { body } = await superagent.post(`${process.env.BackendUrl}/user`)
      .send({ email }).set('Accept', 'application/json').set('Authorization', `Bearer ${token}`);
    console.log('user was retrieved from database');
    dispatch({ type: 'SET_USER', data: body });
  }
  window.location.assign('/admin');
  return 'user set';
}

async function responseGoogleLogin(
  response: GoogleLoginResponseOffline | GoogleLoginResponse, 
  auth: any,
  dispatch: any,
): Promise<string> {
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
<<<<<<< HEAD
    const email = await authenticate(body, view.props); 
    if (email !== 'authenticated') return await setUser(view, email);
    return email;
=======
    await authenticate(googleBody, auth, dispatch); 
    return await setUser(auth, dispatch);
>>>>>>> 3a3a9a2 (WIP Refacoring - Errors Fixed)
  } catch (e) {
    return `${(e as Error).message}`;
  }
  
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
