import type { Dispatch } from 'react';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import { Button } from '@mui/material';
import utils from './utils';
import commonUtils from '../../lib/commonUtils';

const responseGoogleLogout = async (dispatch: Dispatch<unknown>): Promise<void> => {
  dispatch({ type: 'LOGOUT' });
  googleLogout();
  await commonUtils.delay(1);
  window.location.assign('/');
};

export interface IgoogleButtonProps {
  type: 'login' | 'logout', index: string | number | undefined,
  dispatch: Dispatch<unknown>
}
export const GoogleButtons = (props: IgoogleButtonProps): JSX.Element => {
  const { type, index, dispatch } = props;
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => utils.responseGoogleLogin(codeResponse, dispatch),
    onError: () => console.log('Google login failed'),
    flow: 'auth-code',
  });
  if (type === 'login') {
    return (
      <div key={index} className="menu-item googleLogin">
        <Button variant="contained" className="loginButton" size="small" onClick={() => login()}>
          Login
        </Button>
      </div>
    );
  } return (
    <div key={index} className="menu-item googleLogout">
      <Button className="logoutButton" variant="contained" size="small" onClick={() => responseGoogleLogout(dispatch)}>
        Logout
      </Button>
    </div>
  );
};
