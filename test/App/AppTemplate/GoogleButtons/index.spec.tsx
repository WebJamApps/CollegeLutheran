import { GoogleButtons, loginConfig } from 'src/App/AppTemplate/GoogleButtons';
import renderer from 'react-test-renderer';
import { GoogleOAuthProvider } from '@react-oauth/google';
import utils from 'src/App/AppTemplate/GoogleButtons/utils';

describe('GoogleButtons', () => {
  it('renders login and handles click', () => {
    const gb = renderer.create(
      <GoogleOAuthProvider clientId=""><GoogleButtons type="login" index={0} /></GoogleOAuthProvider>).root;
    const result = gb.findByProps({ className: 'loginButton' }).props.onClick();
    expect(result).toBe('login');
  });
  it('renders logout and handles click', () => {
    utils.responseGoogleLogout = jest.fn();
    const gb = renderer.create(
      <GoogleOAuthProvider clientId=""><GoogleButtons type="logout" index={0} /></GoogleOAuthProvider>).root;
    gb.findByProps({ className: 'logoutButton' }).props.onClick();
    expect(utils.responseGoogleLogout).toHaveBeenCalled();
  });
  it('uses loginConfig', async () => {
    utils.responseGoogleLogin = jest.fn();
    const config = loginConfig({} as any, jest.fn());
    await config.onSuccess({} as any);
    expect(utils.responseGoogleLogin).toHaveBeenCalled();
    expect(config.onError()).toBe(false);
  });
});
