import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import superagent from 'superagent';
import authenticate, { logout } from '../../src/App/authActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('authActions', () => {
  it('authenticates', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.resolve({ body: '123' }) }) });
    superagent.post = jest.fn(() => postReturn);
    const result = await authenticate({ code: 'someCode' }, { dispatch: jest.fn(), auth: { isAuthenticated: false } });
    expect(result).toBe(true);
  });
  it('does not fetch if already authenticated', async () => {
    const result = await authenticate({ code: 'someCode' }, { dispatch: jest.fn(), auth: { isAuthenticated: true } });
    expect(result).toBe(true);
  });
  it('returns false when nothing is returned from Google', async () => {
    const postReturn: any = ({
      set: () => ({ send: async () => ({ body: undefined }) }),
    });
    superagent.post = jest.fn(() => postReturn);
    const result = await authenticate({ code: 'someCode' }, { dispatch: jest.fn(), auth: { isAuthenticated: false } });
    expect(result).toBe(false);
  });
  it('returns false when fetch error', async () => {
    const postReturn: any = ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) });
    superagent.post = jest.fn(() => postReturn);
    await expect(authenticate({ code: 'someCode' }, { dispatch: jest.fn(), auth: { isAuthenticated: false } }))
      .rejects.toThrow('bad');
  });
  it('logs out the user', async () => {
    const store = mockStore({ auth: { isAuthenticated: true } });
    const result = logout(store.dispatch);
    expect(result.type).toBe('LOGOUT');
  });
});
