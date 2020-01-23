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
    await expect(authUtils.responseGoogleLogin({}, controllerStub)).rejects.toThrow('Not enough or too many segments');
  });
  it('handles google login with authenticate error', async () => {
    controllerStub.props.dispatch = () => Promise.reject(new Error('bad'));
    await expect(authUtils.responseGoogleLogin({}, controllerStub)).rejects.toThrow('bad');
  });
  it('sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    jwt.encode = jest.fn(() => 'token');
    request.setMockResponse({ body: {} });
    delete window.location;
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    controllerStub.props.dispatch = (obj) => { expect(obj.type).toBeDefined(); };
    const result = await authUtils.setUser(controllerStub);
    expect(result).toBe(true);
  });
  it('catches fetch user error when sets the user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    request.get = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    await expect(authUtils.setUser(controllerStub)).rejects.toThrow('bad');
  });
  it('sets the user to the already decoded user', async () => {
    jwt.decode = jest.fn(() => ({ sub: '123', user: {} }));
    delete window.location;
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    controllerStub.props.dispatch = (obj) => { expect(obj.type).toBe('SET_USER'); };
    const result = await authUtils.setUser(controllerStub);
    expect(result).toBe(true);
  });
  it('logs out when not /dashboard', async () => {
    delete window.location;
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const result = await authUtils.responseGoogleLogout('howdy', () => {});
    expect(result).toBe('howdy');
  });
  it('logs out when /admin', async () => {
    delete window.location;
    window.location = {
      href: '/admin',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const result = await authUtils.responseGoogleLogout('howdy', () => {});
    expect(result).toBe('howdy');
  });
});
