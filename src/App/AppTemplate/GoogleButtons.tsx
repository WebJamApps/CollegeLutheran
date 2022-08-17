import React, { Dispatch } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import utils from './utils';

interface IgoogleButtonProps {
  type: 'login' | 'logout', index: string | number | undefined,
  dispatch: Dispatch<unknown>
}
export const GoogleButtons = (props: IgoogleButtonProps): JSX.Element => {
  const { type, index, dispatch } = props;
  const cId = process.env.GoogleClientId || /* istanbul ignore next */'';
  if (type === 'login') {
    return (
      <div key={index} className="menu-item googleLogin">
        <GoogleLogin
          responseType="code"
          clientId={cId}
          buttonText="Login"
          accessType="offline"
          onSuccess={(response) => utils.responseGoogleLogin(response, dispatch)}
          onFailure={(res)=>console.log(`login failed, ${res}`)}
          cookiePolicy="single_host_origin"
        />
      </div>
    );
  } return (
    <div key={index} className="menu-item googleLogout">
      <GoogleLogout clientId={cId} buttonText="Logout" onLogoutSuccess={() => utils.responseGoogleLogout(dispatch)} />
    </div>
  );
};
