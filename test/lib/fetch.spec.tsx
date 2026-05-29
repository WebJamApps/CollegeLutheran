/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';
import fetchUtil from '../../src/lib/fetch';

describe('fetch', () => {
  beforeEach(() => {
    vi.spyOn(toast, 'warning').mockImplementation(() => 0 as never);
  });

  it('is defined', () => {
    expect(fetchUtil).toBeDefined();
  });
  it('GET catches error', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('bad'))));
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(false);
  });
  it('GET catches error when PageContent', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.reject(new Error('bad'))));
    const dispatch = vi.fn();
    const r = await fetchUtil.fetchGet(dispatch, '/?type=PageContent', '');
    expect(r).toBe(false);
    expect(dispatch).toHaveBeenCalled();
  });
  it('GET catches non-ok response', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({ ok: false, status: 500 })));
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(false);
  });
  it('GET is successful', async () => {
    vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({}),
    })));
    const r = await fetchUtil.fetchGet(vi.fn(), '/', '');
    expect(r).toBe(true);
  });
});
