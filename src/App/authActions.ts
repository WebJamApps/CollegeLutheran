import request from 'superagent';

export const gotToken = (doc: any) => ({
  type: 'GOT_TOKEN',
  data: doc,
});

export const authError = (e: Error) => ({
  type: 'AUTH_ERROR',
  error: e,
});

export const logout = () => (dispatch: (arg0: { type: string; }) => any) => dispatch({ type: 'LOGOUT' });

const authFunc = (body: string | any | undefined) => async (dispatch:
(arg0: { type: string; error?: any; data?: any; }) => void, getState: () => { auth: any; }) => {
  const { auth } = getState();
  if (auth.isAuthenticated) return Promise.resolve(true);
  let data;
  try {
    data = await request.post(`${process.env.BackendUrl}/user/auth/google`)
      .set({ Accept: 'application/json' }).send(body);
  } catch (e) {
    dispatch(authError(e));
    return Promise.reject(e);
  }
  if (!data.body) {
    dispatch(authError(new Error('authentication failed')));
    return Promise.resolve(false);
  }
  dispatch(gotToken(data.body));
  return Promise.resolve(true);
};

export default authFunc;
