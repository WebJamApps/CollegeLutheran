import superagent from 'superagent';
import authenticate, { logout } from '../../src/App/authActions';

describe('authActions', () => {
  it('authenticates', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    const gBody: any = { code: 'someCode' };
    const auth: any = { isAuthenticated: false };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authenticated');
  });
  it('does not fetch if already authenticated', async () => {
    const gBody: any = { code: 'someCode' };
    const auth: any = { isAuthenticated: true };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authenticated');
  });
  it('returns false when nothing is returned from Google', async () => {
    const postReturn: any = ({
      set: () => ({ send: async () => ({ body: undefined }) }),
    });
    superagent.post = jest.fn(() => postReturn);
    const gBody: any = { code: 'someCode' };
    const auth: any = { isAuthenticated: false };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authentication failed');
  });
  it('returns error when fetch error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    const gBody: any = { code: 'someCode' };
    const auth: any = { isAuthenticated: false };
    await expect(authenticate(gBody, { dispatch: jest.fn(), auth })).rejects.toThrow('bad');
  });
  it('logs out the user', async () => {
    const dispatch = jest.fn((obj) => expect(obj.type).toBe('LOGOUT'));
    logout(dispatch);
  });
});
