import axios from 'axios';
import picUtils from 'src/containers/AdminDashboard/pictures.utils';
import { defaultPic } from 'src/containers/AdminDashboard/utils';

describe('pictures.utils', () => {
  it('deletePic', async () => {
    axios.request = vi.fn();
    await picUtils.deletePic(defaultPic, vi.fn(), { token: 'token' } as any, vi.fn(), vi.fn());
    expect(axios.request).toHaveBeenCalled();
  });
  it('updatePic', async () => {
    axios.request = vi.fn();
    await picUtils.updatePic(defaultPic, { token: 'token' } as any, vi.fn(), vi.fn(), vi.fn());
    expect(axios.request).toHaveBeenCalled();
  });
  it('performAxiosRequest successfully', async () => {
    axios.request = vi.fn(() => Promise.resolve({ status: 200 })) as any;
    const setShowTable = vi.fn();
    await picUtils.performAxiosRequest({}, vi.fn(), vi.fn(), setShowTable);
    expect(setShowTable).toHaveBeenCalledWith(false);
  });
});
