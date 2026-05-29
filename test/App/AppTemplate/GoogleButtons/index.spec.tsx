/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleButtons, loginConfig } from 'src/App/AppTemplate/GoogleButtons';
import { render, fireEvent } from '@testing-library/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import utils from 'src/App/AppTemplate/GoogleButtons/utils';

describe('GoogleButtons', () => {
  it('renders login and handles click', () => {
    const { container } = render(
      <GoogleOAuthProvider clientId=""><GoogleButtons type="login" index={0} /></GoogleOAuthProvider>,
    );
    const btn = container.querySelector('.loginButton') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    fireEvent.click(btn!);
  });
  it('renders logout and handles click', () => {
    utils.responseGoogleLogout = vi.fn();
    const { container } = render(
      <GoogleOAuthProvider clientId=""><GoogleButtons type="logout" index={0} /></GoogleOAuthProvider>,
    );
    const btn = container.querySelector('.logoutButton') as HTMLButtonElement | null;
    expect(btn).not.toBeNull();
    fireEvent.click(btn!);
    expect(utils.responseGoogleLogout).toHaveBeenCalled();
  });
  it('uses loginConfig', async () => {
    utils.responseGoogleLogin = vi.fn();
    const config = loginConfig({} as any, vi.fn());
    await config.onSuccess({} as any);
    expect(utils.responseGoogleLogin).toHaveBeenCalled();
    expect(config.onError()).toBe(false);
  });
});
