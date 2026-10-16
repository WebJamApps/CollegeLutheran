import { CodeResponse, useGoogleLogin } from '@react-oauth/google';
import { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import utils from './utils';

export const loginConfig = (auth: Iauth, setAuth: (args0: Iauth) => void) => ({
  onSuccess: async (codeResponse: Omit<CodeResponse, 'error' | 'error_description' | 'error_uri'>) => {
    await utils.responseGoogleLogin(codeResponse, auth, setAuth, process.env.NODE_ENV);
  },
  onError: () => { console.error('Google login failed'); return false; },
  flow: 'auth-code',
});

interface IgoogleButtonsProps { type: string, index: number, handleClose?: () => void }
export function GoogleButtons(props: IgoogleButtonsProps) {
  const { setAuth, auth } = useContext(AuthContext);
  const { type, index, handleClose } = props;
  const login = useGoogleLogin(loginConfig(auth, setAuth) as Record<string, unknown>);
  if (type === 'login') {
    return (
      <div key={index} className="menu-item googleLogin">
        <Button
          variant="contained"
          className="loginButton"
          size="small"
          onClick={() => {
            if (handleClose) handleClose();
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
        onClick={async () => {
          if (handleClose) handleClose();
          await utils.responseGoogleLogout(setAuth);
        }}
      >
        Logout
      </Button>
    </div>
  );
}
