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

export const logout = (dispatch: Dispatch<unknown>): void => dispatch({ type: 'LOGOUT' });

async function authFunc(body: GoogleBody, props: AppProps): Promise<string | Error> {
  const { auth } = props;
  if (auth.isAuthenticated) return 'authenticated';
  let data;
  try {
    data = await superagent.post(`${process.env.BackendUrl}/user/auth/google`)
      .set({ Accept: 'application/json' }).send(body);
  } catch (e) {
    props.dispatch(authError((e as Error)));
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
    props.dispatch(authError(e as Error));
    return Promise.reject(e);
  }
  if (!data.body) {
    props.dispatch(authError(new Error('authentication failed')));
    return 'authentication failed';
  }
  props.dispatch(gotToken(data.body));
  return 'authenticated';
}

export default authFunc;
