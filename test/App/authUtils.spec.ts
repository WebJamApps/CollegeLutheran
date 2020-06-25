/* eslint-disable @typescript-eslint/ban-ts-comment */
import jwt from 'jwt-simple';
import request from 'superagent';
import authUtils from '../../src/App/authUtils';

describe('authUtils', () => {
  const controllerStub = {
    props: { auth: { token: 'token' }, dispatch: () => Promise.resolve(true) },
  };
  it('handles failed login', () => new Promise((done) => {
    const result = authUtils.responseGoogleFailLogin('no way');
    expect(result).toBe(false);
    done();
  }));
  it('handles google login with bad token', async () => {
    await expect(authUtils.responseGoogleLogin({ code: '' }, controllerStub)).rejects.toThrow('Not enough or too many segments');
  });
  it('handles google login with authenticate error', async () => {
    controllerStub.props.dispatch = () => Promise.reject(new Error('bad'));
    await expect(authUtils.responseGoogleLogin({ code: '' }, controllerStub)).rejects.toThrow('bad');
  });
  it('sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    jwt.encode = jest.fn(() => 'token');
    // @ts-ignore
    request.get = () => ({ set: () => ({ set: () => Promise.resolve({ body: {} }) }) });
    delete window.location;
    // @ts-ignore
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    // @ts-ignore
    controllerStub.props.dispatch = (obj) => { expect(obj.type).toBeDefined(); };
    const result = await authUtils.setUser(controllerStub);
    expect(result).toBe(true);
  });
  it('catches fetch user error when sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    // @ts-ignore
    request.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    await expect(authUtils.setUser(controllerStub)).rejects.toThrow('bad');
  });
  it('sets the user to the already decoded user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123', user: {} }));
    delete window.location;
    // @ts-ignore
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    // @ts-ignore
    controllerStub.props.dispatch = (obj) => { expect(obj.type).toBe('SET_USER'); };
    const result = await authUtils.setUser(controllerStub);
    expect(result).toBe(true);
  });
  it('logs out when not /dashboard', () => {
    delete window.location;
    // @ts-ignore
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    authUtils.responseGoogleLogout(() => {});
    expect(window.location.reload).toHaveBeenCalled();
  });
  it('logs out when /admin', () => {
    delete window.location;
    // @ts-ignore
    window.location = {
      href: '/admin',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    authUtils.responseGoogleLogout(() => {});
    expect(window.location.assign).toHaveBeenCalled();
  });
});
