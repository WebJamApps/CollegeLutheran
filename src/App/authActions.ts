import superagent from 'superagent';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import type { Dispatch } from 'react';
import type { AppProps, GoogleBody } from './AppTypes';

export const gotToken = (doc: string): unknown => ({
  type: 'GOT_TOKEN',
  data: doc,
});

export const authError = (e: Error): unknown => ({
  type: 'AUTH_ERROR',
  error: e,
});

function warningNotif(title: string, message: string) {
  store.addNotification({
    title,
    message,
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

}

export const logout = (dispatch: Dispatch<unknown>): void => dispatch({ type: 'LOGOUT' });

async function authFunc(googleBody: GoogleBody, props: AppProps): Promise<string | Error> {
  const { auth } = props;
  if (auth.isAuthenticated) return 'authenticated';
   
  try {
    const { body } = await superagent.post(`${process.env.BackendUrl}/user/auth/google`)
      .set({ Accept: 'application/json' }).send(googleBody);
    props.dispatch(gotToken(body));
    return 'authenticated';
  } catch (e) {
    props.dispatch(authError((e as Error))); warningNotif((e as Error).message, 'Failed to Authenticate');  
    return Promise.reject(e);
  }
  
}

export default authFunc;
