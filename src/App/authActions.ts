import superagent from 'superagent';

export const gotToken = (doc: any) => ({
  type: 'GOT_TOKEN',
  data: doc,
});

export const authError = (e: Error) => ({
  type: 'AUTH_ERROR',
  error: e,
});

export const logout = () => (dispatch: (arg0: { type: string; }) => any) => dispatch({ type: 'LOGOUT' });

async function authFunc(body: any, props:any) {
  const { auth } = props;
  if (auth.isAuthenticated) return Promise.resolve(true);
  let data;
  try {
    data = await superagent.post(`${process.env.BackendUrl}/user/auth/google`)
      .set({ Accept: 'application/json' }).send(body);
  } catch (e) {
    props.dispatch(authError(e));
    return Promise.reject(e);
  }
  if (!data.body) {
    props.dispatch(authError(new Error('authentication failed')));
    return Promise.resolve(false);
  }
  props.dispatch(gotToken(data.body));
  return Promise.resolve(true);
}

export default authFunc;
