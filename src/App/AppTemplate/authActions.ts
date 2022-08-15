import superagent from 'superagent';
import 'react-notifications-component/dist/theme.css';
import type { Dispatch } from 'react';
import type { GoogleBody } from '../AppTypes';

export const gotToken = (doc: string): unknown => ({
  type: 'GOT_TOKEN',
  data: doc,
});

export const logout = (dispatch: Dispatch<unknown>): void => dispatch({ type: 'LOGOUT' });

export async function authenticate(googleBody: GoogleBody, dispatch:Dispatch<unknown>): Promise<string> {
  const { body } = await superagent.post(`${process.env.BackendUrl}/user/auth/google`)
    .set({ Accept: 'application/json' }).send(googleBody);
  dispatch(gotToken(body));
  return body.sub;
}
