/* eslint-disable @typescript-eslint/no-explicit-any */
import superagent from 'superagent';
import authenticate, { logout } from '../../src/App/authActions';
import { Auth } from '../../src/redux/mapStoreToProps';
import { GoogleBody } from '../../src/App/AppTypes';

describe('authActions', () => {
  it('authenticates', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    const gBody: GoogleBody = {
      code: 'someCode',
      clientId: '',
      redirectUri: '',
      state() {
        const randomString = '';
        return randomString;
      },
    };
    const auth: Auth = {
      isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
    };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authenticated');
  });
  it('does not fetch if already authenticated', async () => {
    const gBody: GoogleBody = {
      code: 'someCode',
      clientId: '',
      redirectUri: '',
      state() {
        const randomString = '';
        return randomString;
      },
    };
    const auth: Auth = {
      isAuthenticated: true, error: '', email: '', token: '', user: { userType: '' },
    };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authenticated');
  });
  it('returns false when nothing is returned from Google', async () => {
    const postReturn: any = ({
      set: () => ({ send: async () => ({ body: undefined }) }),
    });
    superagent.post = jest.fn(() => postReturn);
    const gBody: GoogleBody = {
      code: 'someCode',
      clientId: '',
      redirectUri: '',
      state() {
        const randomString = '';
        return randomString;
      },
    };
    const auth: Auth = {
      isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
    };
    const result = await authenticate(gBody, { dispatch: jest.fn(), auth });
    expect(result).toBe('authentication failed');
  });
  it('returns error when fetch error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    const gBody: GoogleBody = {
      code: 'someCode',
      clientId: '',
      redirectUri: '',
      state() {
        const randomString = '';
        return randomString;
      },
    };
    const auth: Auth = {
      isAuthenticated: false, error: '', email: '', token: '', user: { userType: '' },
    };
    await expect(authenticate(gBody, { dispatch: jest.fn(), auth })).rejects.toThrow('bad');
  });
  it('logs out the user', async () => {
    const dispatch = jest.fn((obj) => expect(obj.type).toBe('LOGOUT'));
    logout(dispatch);
  });
});
