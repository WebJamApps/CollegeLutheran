import { AuthProvider, defaultSetAuth } from 'src/providers/Auth.provider';
import renderer from 'react-test-renderer';

describe('Auth Provider', () => {
  it('renders the Auth provider', () => {
    const authProvider = renderer.create(<AuthProvider><div /></AuthProvider>).toJSON();
    expect(authProvider).toBeDefined();
  });
  it('defaultSetAuth', () => {
    const Iauth: any = {};
    expect(defaultSetAuth(Iauth)).toBe(console.log());
  });
});
