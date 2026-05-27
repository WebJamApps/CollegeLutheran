/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthProvider, defaultSetAuth } from 'src/providers/Auth.provider';
import { render } from '@testing-library/react';

describe('Auth Provider', () => {
  it('renders the Auth provider', () => {
    const { container } = render(<AuthProvider><div /></AuthProvider>);
    expect(container).toBeDefined();
  });
  it('defaultSetAuth', () => {
    const Iauth: any = {};
    expect(defaultSetAuth(Iauth)).toBeUndefined();
  });
});
