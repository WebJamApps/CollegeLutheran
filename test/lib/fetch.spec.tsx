/* eslint-disable @typescript-eslint/no-explicit-any */
import superagent from 'superagent';
import { Store } from 'react-notifications-component';
import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  it('is defined', () => {
    expect(fetch).toBeDefined();
  });
  it('GET catches error', async () => {
    const myMock:any = vi.fn(() => ({ set: () => Promise.reject(new Error('bad')) }));
    superagent.get = myMock;
    Store.addNotification = vi.fn();
    const r = await fetch.fetchGet(
      vi.fn(),
      '/',
      '');
    expect(r).toBe(false);
  });
  it('GET catches error when PageContent', async () => {
    const myMock:any = vi.fn(() => ({ set: () => Promise.reject(new Error('bad')) }));
    superagent.get = myMock;
    const dispatch = vi.fn();
    Store.addNotification = vi.fn();
    const r = await fetch.fetchGet(
      dispatch,
      '/?type=PageContent',
      '');
    expect(r).toBe(false);
    expect(dispatch).toHaveBeenCalled();
  });
  it('GET is successful', async () => {
    const myMock:any = vi.fn(() => ({ set: () => Promise.resolve({ body: {} }) }));
    superagent.get = myMock;
    Store.addNotification = vi.fn();
    const r = await fetch.fetchGet(
      vi.fn(),
      '/',
      '');
    expect(r).toBe(true);
  });
});
