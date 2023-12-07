import axios from 'axios';
import picUtils from 'src/containers/AdminDashboard/pictures.utils';
import { defaultPic } from 'src/containers/AdminDashboard/utils';

describe('pictures.utils', () => {
  it('deletePic', async () => {
    axios.request = jest.fn();
    await picUtils.deletePic(defaultPic, jest.fn(), { token: 'token' } as any, jest.fn(), jest.fn());
    expect(axios.request).toHaveBeenCalled();
  });
  it('updatePic', async () => {
    axios.request = jest.fn();
    await picUtils.updatePic(defaultPic, { token: 'token' } as any, jest.fn(), jest.fn(), jest.fn());
    expect(axios.request).toHaveBeenCalled();
  });
  it('performAxiosRequest successfully', async () => {
    axios.request = jest.fn(() => Promise.resolve({ status: 200 })) as any;
    const setShowTable = jest.fn();
    await picUtils.performAxiosRequest({}, jest.fn(), jest.fn(), setShowTable);
    expect(setShowTable).toHaveBeenCalledWith(false);
  });
});
