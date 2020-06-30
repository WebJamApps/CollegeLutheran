import jwt from 'jwt-simple';
import superagent from 'superagent';
import authUtils from '../../src/App/authUtils';

describe('authUtils', () => {
  const vStub = {
    props: { auth: { token: 'token' }, dispatch: () => Promise.resolve(true) },
  };
  it('is defined', () => {
    expect(authUtils).toBeDefined();
  });
  it('logs out when not /dashboard', () => {
    delete window.location;
    window.location = {
      ...window.location,
      href: '/',
      reload: jest.fn(),
    };
    const r = authUtils.responseGoogleLogout(() => { });
    expect(r).toBe('reload');
  });
  it('handles failed login', () => {
    const result = authUtils.responseGoogleFailLogin('no way');
    expect(result).toBe(false);
  });
  it('handles google login with bad token', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    await expect(authUtils.responseGoogleLogin({ code: '' }, vStub)).rejects.toThrow('Not enough or too many segments');
  });
  it('handles google login with authenticate error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    await expect(authUtils.responseGoogleLogin({ code: '' }, vStub)).rejects.toThrow('bad');
  });
  it('sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    jwt.encode = jest.fn(() => 'token');
    const returnBody: any = { body: {} };
    const sa: any = superagent;
    sa.get = () => ({ set: () => ({ set: () => Promise.resolve(returnBody) }) });
    delete window.location;
    window.location = {
      ...window.location,
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const result = await authUtils.setUser(vStub);
    expect(result).toBe(true);
  });
  it('sets the user to the already decoded user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123', user: {} }));
    delete window.location;
    window.location = {
      ...window.location,
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const result = await authUtils.setUser(vStub);
    expect(result).toBe(true);
  });
  it('catches fetch user error when sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    const sa: any = superagent;
    sa.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    await expect(authUtils.setUser(vStub)).rejects.toThrow('bad');
  });
  it('logs out when /admin', () => {
    delete window.location;
    window.location = {
      ...window.location,
      href: '/admin',
      assign: jest.fn(),
    };
    const r = authUtils.responseGoogleLogout(() => { });
    expect(r).toBe('assign');
  });
});
