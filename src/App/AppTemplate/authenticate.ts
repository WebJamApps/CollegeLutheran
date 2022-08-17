import superagent from 'superagent';
import type { Dispatch } from 'react';
import type { GoogleBody } from './utils';

export async function authenticate(
  googleBody: GoogleBody, dispatch:Dispatch<unknown>,
):Promise<any> {
  const { body } = await superagent.post(`${process.env.BackendUrl}/user/auth/google`)
    .set({ Accept: 'application/json' }).send(googleBody);
  dispatch({ type: 'GOT_TOKEN', data: body });
  return body;
}
