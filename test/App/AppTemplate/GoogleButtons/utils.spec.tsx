import utils from 'src/App/AppTemplate/GoogleButtons/utils';
import commonUtils from 'src/lib/commonUtils';
import superagent from 'superagent';
import jwt from 'jwt-simple';

describe('GoogleButtons/utils', () => {
  it('responseGoogleLogout', async () => {
    const reload = jest.fn();
    Object.defineProperty(window, 'location', { value: { assign: () => { }, reload }, writable: true });
    await utils.responseGoogleLogout(jest.fn());
    expect(reload).toHaveBeenCalled();
  });
  it('responseGoogleLogin fails', async () => {
    let eMessage = '';
    commonUtils.notify = jest.fn((m) => { eMessage = m; });
    await utils.responseGoogleLogin({ code: '' } as any, {} as any, jest.fn(), 'test');
    expect(eMessage).toBe('Failed to authenticate');
  });
  it('responseGoogleLogin succeeds', async () => {
    const setAuth = jest.fn();
    const getMock: any = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ body: {} }) }) }));
    superagent.get = getMock;
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    const href = 'http://localhost:7777';
    const reload = jest.fn();
    Object.defineProperty(window, 'location', { value: { href, assign: () => { }, reload }, writable: true });
    const postMock: any = jest.fn(() => ({ set: () => ({ send: () => Promise.resolve({ body: { token: 'token' } }) }) }));
    superagent.post = postMock;
    await utils.responseGoogleLogin({ code: '' } as any, {} as any, setAuth, 'test');
    expect(setAuth).toHaveBeenCalled();
  });
  it('responseGoogleLogin succeeds when production', async () => {
    const setAuth = jest.fn();
    const getMock: any = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ body: {} }) }) }));
    superagent.get = getMock;
    jwt.decode = jest.fn(() => ({ sub: '123' }));
    const href = 'https://web-jam.com';
    const reload = jest.fn();
    Object.defineProperty(window, 'location', { value: { href, assign: () => { }, reload }, writable: true });
    const postMock: any = jest.fn(() => ({ set: () => ({ send: () => Promise.resolve({ body: { token: 'token' } }) }) }));
    superagent.post = postMock;
    await utils.responseGoogleLogin({ code: '' } as any, {} as any, setAuth, 'production');
    expect(setAuth).toHaveBeenCalled();
  });
  it('makeState', () => {
    const result = utils.makeState();
    const state = result();
    expect(typeof state).toBe('string');
  });
});
