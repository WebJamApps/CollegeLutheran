import picUtils from 'src/containers/AdminDashboard/pictures.utils';
import { defaultPic } from 'src/containers/AdminDashboard/utils';

describe('pictures.utils', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('deletePic', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ status: 204 }));
    vi.stubGlobal('fetch', fetchMock);
    await picUtils.deletePic(defaultPic, vi.fn(), { token: 'token' } as any, vi.fn(), vi.fn());
    expect(fetchMock).toHaveBeenCalled();
  });
  it('updatePic', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    await picUtils.updatePic(defaultPic, { token: 'token' } as any, vi.fn(), vi.fn(), vi.fn());
    expect(fetchMock).toHaveBeenCalled();
  });
  it('performFetchRequest successfully', async () => {
    const fetchMock = vi.fn(() => Promise.resolve({ status: 200 }));
    vi.stubGlobal('fetch', fetchMock);
    const setShowTable = vi.fn();
    await picUtils.performFetchRequest('http://example/x', { method: 'GET' }, vi.fn(), vi.fn(), setShowTable);
    expect(setShowTable).toHaveBeenCalledWith(false);
  });
});
