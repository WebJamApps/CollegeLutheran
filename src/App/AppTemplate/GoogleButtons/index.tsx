import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import utils from './utils';

export const loginConfig = (auth:Iauth, setAuth: (args0:Iauth)=>void) => ({
  onSuccess: async (codeResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    await utils.responseGoogleLogin(codeResponse, auth, setAuth, process.env.NODE_ENV);
  },
  onError: () => { console.log('Google login failed'); return false; },
  flow: 'auth-code',
});

interface IgoogleButtonsProps { type: string, index: number}
export function GoogleButtons(props: IgoogleButtonsProps): JSX.Element {
  const { setAuth, auth } = useContext(AuthContext);
  const { type, index } = props;
  const login = useGoogleLogin(loginConfig(auth, setAuth) as Record<string, unknown>);
  if (type === 'login') {
    return (
      <div key={index} className="menu-item googleLogin">
        <Button
          variant="contained"
          className="loginButton"
          size="small"
          onClick={() => {
            login(); return 'login';
          }}
        >
          Login
        </Button>
      </div>
    );
  } return (
    <div key={index} className="menu-item googleLogout">
      <Button
        className="logoutButton"
        variant="contained"
        size="small"
        onClick={async () => { await utils.responseGoogleLogout(setAuth); }}
      >
        Logout
      </Button>
    </div>
  );
}
