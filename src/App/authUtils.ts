import request from 'superagent';
import jwt from 'jwt-simple';
import authenticate, { logout } from './authActions';

const setUser = async (controller: { props: { auth: any; dispatch: any; }; }) => {
  const { auth, dispatch } = controller.props;
  let decoded: { user: any; sub: any; }, user: request.Response;
  try {
    decoded = jwt.decode(auth.token, process.env.HashString || /* istanbul ignore next */'');
  } catch (e) { return Promise.reject(e); }
  if (decoded.user) dispatch({ type: 'SET_USER', data: decoded.user });
  else {
    try {
      user = await request.get(`${process.env.BackendUrl}/user/${decoded.sub}`)
        .set('Accept', 'application/json').set('Authorization', `Bearer ${auth.token}`);
    } catch (e) { return Promise.reject(e); }
    dispatch({ type: 'SET_USER', data: user.body });
    decoded.user = user.body;
    const newToken = jwt.encode(decoded, process.env.HashString || /* istanbul ignore next */'');
    dispatch({ type: 'GOT_TOKEN', data: { token: newToken, email: auth.email } });
  }
  window.location.reload();
  window.location.assign('/admin');
  return Promise.resolve(true);
};
const responseGoogleLogin = async (response: { code: any; }, controller: { props: any; }) => {
  const { dispatch } = controller.props;
  const uri = window.location.href;
  const baseUri = uri.split('/')[2];
  const body = {
    clientId: process.env.GoogleClientId,
    redirectUri: /* istanbul ignore next */process.env.NODE_ENV === 'production' ? `https://${baseUri}` : `http://${baseUri}`,
    code: `${response.code}`,
    /* istanbul ignore next */state() {
      const rand = Math.random().toString(36).substr(2);
      return encodeURIComponent(rand);
    },
  };
  try { await dispatch(authenticate(body)); } catch (e) {
    return Promise.reject(e);
  }
  return setUser(controller);
};

const responseGoogleFailLogin = (response: any) => {
  console.log(response);// eslint-disable-line no-console
  return false;
};

const responseGoogleLogout = (dispatch: (arg0: (dispatch: any) => any) => void) => {
  dispatch(logout());
  if (window.location.href.includes('/admin')) return window.location.assign('/staff');
  return window.location.reload();
};

export default {
  responseGoogleLogin, responseGoogleLogout, responseGoogleFailLogin, setUser,
};
