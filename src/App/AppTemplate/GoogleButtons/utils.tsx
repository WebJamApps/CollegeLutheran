import { CodeResponse, googleLogout } from '@react-oauth/google';
import { defaultAuth, Iauth } from 'src/providers/Auth.provider';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';
import commonUtils from 'src/lib/commonUtils';

export interface GoogleBody {
  clientId?: string,
  redirectUri: string,
  code: string,
  state(): string,
}

const setUserAuth = async (
  setAuth: (arg0: Iauth) => void,
  token: string,
  userId: string | undefined,
) => {
  const res = await fetch(`${process.env.BackendUrl}/user/${userId}`, {
    headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  setAuth({
    error: '', isAuthenticated: true, token, user: body,
  });
};

const setUser = async (auth: Iauth, setAuth: (args0: Iauth) => void, token: string): Promise<void> => {
  const { sub } = jwtDecode<{ sub?: string }>(token);
  await setUserAuth(setAuth, token, sub);
};

const authenticate = async (
  googleBody: GoogleBody,
): Promise<{ token: string, email: string }> => {
  const res = await fetch(`${process.env.BackendUrl}/user/auth/google`, {
    method: 'POST',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(googleBody),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
};

const makeState = () => () => {
  const rand = Math.random().toString(36).substr(2);
  return encodeURIComponent(rand);
};

const responseGoogleLogin = async (
  response: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>,
  auth: Iauth,
  setAuth: (arg0: Iauth) => void,
  nodeEnv?: string,
): Promise<void> => {
  try {
    const uri = window.location.href;
    const baseUri = uri.split('/')[2];
    // Match the page's actual scheme. Production is https; local dev is usually
    // http, but can be https (DEV_HTTPS=true) to exercise the FB.login Reconnect
    // flow. The redirect_uri sent to Google's token endpoint must match the
    // scheme the auth code was issued under, or the exchange 400s.
    const { protocol } = window.location;
    const body = {
      clientId: process.env.GoogleClientId,
      redirectUri: !baseUri.includes('localhost')
        && nodeEnv === 'production' ? `https://${baseUri}`
        : `${protocol}//${baseUri}`,
      code: `${response.code}`,
      state: makeState(),
    };
    const { token } = await authenticate(body);
    await setUser(auth, setAuth, token);
  } catch (e) {
    console.error(e);
    const eMessage = (e as Error).message;
    commonUtils.notify('Failed to authenticate', eMessage, 'danger');
    setAuth({ ...defaultAuth, error: eMessage });
  }
};

const responseGoogleLogout = async (setAuth: (arg0: Iauth) => void): Promise<void> => {
  googleLogout();
  setAuth(defaultAuth);
  window.location.reload();
};

export default {
  responseGoogleLogin, responseGoogleLogout, authenticate, setUser, makeState,
};
