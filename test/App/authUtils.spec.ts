import jwt from 'jwt-simple';
import superagent from 'superagent';
import authUtils from '../../src/App/authUtils';

describe('authUtils', () => {
  const vStub: any = {
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
    expect(result).toBe('no way');
  });
  it('handles google login with bad token', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    const res = await authUtils.responseGoogleLogin({ code: '' }, vStub);
    expect(res).toBe('Not enough or too many segments');
  });
  it('handles google login with authenticate error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    const res = await authUtils.responseGoogleLogin({ code: '' }, vStub);
    expect(res).toBe('bad');
  });
  it('sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    jwt.encode = jest.fn(() => 'token');
    const returnBody: Record<string, unknown> = { body: {} };
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
    expect(result).toBe('user set');
  });
  it('sets the user fails to decode the token', async () => {
    jwt.decode = jest.fn(() => { throw new Error('bad'); });
    vStub.props.auth = {};
    const result = await authUtils.setUser(vStub);
    expect(result).toBe('bad');
    vStub.props.auth = { token: 'token' };
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
    expect(result).toBe('user set');
  });
  it('catches fetch user error when sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    const sa: any = superagent;
    sa.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    const res = await authUtils.setUser(vStub);
    expect(res).toBe('bad');
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
