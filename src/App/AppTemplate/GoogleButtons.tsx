import React from 'react';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline, GoogleLogout } from 'react-google-login';
import authUtils from './authUtils';

function responseGoogleLogin(response: GoogleLoginResponseOffline | GoogleLoginResponse): Promise<string> {
  return authUtils.responseGoogleLogin(response);
}

function responseGoogleLogout(): string { const { dispatch } = this.props; return authUtils.responseGoogleLogout(dispatch); }

export const GoogleButtons = ({ type, index }: { type:string, index:string | number | undefined }): JSX.Element => {
  const cId = process.env.GoogleClientId || /* istanbul ignore next */'';
  if (type === 'login') {
    return (
        <div key={index} className="menu-item googleLogin">
          <GoogleLogin
            responseType="code"
            clientId={cId}
            buttonText="Login"
            accessType="offline"
            onSuccess={responseGoogleLogin}
            onFailure={authUtils.responseGoogleFailLogin}
            cookiePolicy="single_host_origin"
          />
        </div>
    );
  } return (
      <div key={index} className="menu-item googleLogout">
        <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={responseGoogleLogout} />
      </div>
  );
};