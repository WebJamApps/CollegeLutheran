import jwt from 'jwt-simple';
import superagent from 'superagent';
import authUtils from '../../src/App/authUtils';

describe('authUtils', () => {
  const controllerStub = {
    props: { auth: { token: 'token' }, dispatch: () => Promise.resolve(true) },
  };
  it('is defined', () => {
    expect(authUtils).toBeDefined();
  });
  // it('logs out when not /dashboard', () => {
  //   window.location = {
  //     ...window.location,
  //     href: '/',
  //     reload: () => true,
  //   };
  //   const r = authUtils.responseGoogleLogout(() => { });
  //   expect(r).toBe('reload');
  // });
  // it('handles failed login', () => {
  //   const result = authUtils.responseGoogleFailLogin('no way');
  //   expect(result).toBe(false);
  // });
  // it('handles google login with bad token', async () => {
  //   await expect(authUtils.responseGoogleLogin({ code: '' }, controllerStub)).rejects.toThrow('Not enough or too many segments');
  // });
  // it('handles google login with authenticate error', async () => {
  //   controllerStub.props.dispatch = () => Promise.reject(new Error('bad'));
  //   await expect(authUtils.responseGoogleLogin({ code: '' }, controllerStub)).rejects.toThrow('bad');
  // });
  // it('sets the user', async () => {
  //   jwt.decode = jest.fn(() => ({ sub: '123' }));
  //   jwt.encode = jest.fn(() => 'token');
  //   const returnBody: any = { body: {} };
  //   const sa: any = superagent;
  //   sa.get = () => ({ set: () => ({ set: () => Promise.resolve(returnBody) }) });
  //   window.location = {
  //     ...window.location,
  //     href: '/',
  //     assign: jest.fn(),
  //     reload: jest.fn(),
  //   };
  //   const result = await authUtils.setUser(controllerStub);
  //   expect(result).toBe(true);
  // });
  // it('sets the user to the already decoded user', async () => {
  //   jwt.decode = jest.fn(() => ({ sub: '123', user: {} }));
  //   window.location = {
  //     ...window.location,
  //     href: '/',
  //     assign: jest.fn(),
  //     reload: jest.fn(),
  //   };
  //   const result = await authUtils.setUser(controllerStub);
  //   expect(result).toBe(true);
  // });
  // it('catches fetch user error when sets the user', async () => {
  //   jwt.decode = jest.fn(() => ({ sub: '123' }));
  //   const sa: any = superagent;
  //   sa.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
  //   await expect(authUtils.setUser(controllerStub)).rejects.toThrow('bad');
  // });

  // it('logs out when /admin', () => {
  //   window.location = {
  //     ...window.location,
  //     href: '/admin',
  //     assign: jest.fn(),
  //   };
  //   const r = authUtils.responseGoogleLogout(() => { });
  //   expect(r).toBe('assign');
  // });
});
