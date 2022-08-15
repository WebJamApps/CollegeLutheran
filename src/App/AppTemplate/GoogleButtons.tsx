import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import authUtils from './authUtils';

// function responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): Promise<string> {
//   return authUtils.responseGoogleLogin(response);
// }

// function responseGoogleLogout(): string { const { dispatch } = this.props; return authUtils.responseGoogleLogout(dispatch); }

interface IgoogleButtonProps { type:'login' | 'logout', index:string | number | undefined, dispatch:any, auth:any }
export const GoogleButtons = (props: IgoogleButtonProps): JSX.Element => {
  const { type, index, auth, dispatch } = props;
  const cId = process.env.GoogleClientId || /* istanbul ignore next */'';
  if (type === 'login') {
    return (
        <div key={index} className="menu-item googleLogin">
          <GoogleLogin
            responseType="code"
            clientId={cId}
            buttonText="Login"
            accessType="offline"
            onSuccess={(response) => authUtils.responseGoogleLogin(response, auth, dispatch)}
            onFailure={authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
    );
  } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={() => authUtils.responseGoogleLogout(dispatch)} />
      </div>
  );
};