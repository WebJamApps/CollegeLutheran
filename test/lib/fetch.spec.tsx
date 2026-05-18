/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from 'react-notifications-component';
import fetchUtil from '../../src/lib/fetch';

describe('fetch', () => {
  it('is defined', () => {
    expect(fetchUtil).toBeDefined();
  });
  it('GET catches error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('bad'))));
    Store.addNotification = vi.fn();
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(false);
  });
  it('GET catches error when PageContent', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('bad'))));
    const dispatch = vi.fn();
    Store.addNotification = vi.fn();
    const r = await fetchUtil.fetchGet(dispatch, '/?type=PageContent', '');
    expect(r).toBe(false);
    expect(dispatch).toHaveBeenCalled();
  });
  it('GET catches non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    Store.addNotification = vi.fn();
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(false);
  });
  it('GET is successful', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })));
    Store.addNotification = vi.fn();
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(true);
  });
});
