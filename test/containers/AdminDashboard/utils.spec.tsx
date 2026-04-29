import axios, { AxiosError } from 'axios';
import utils from 'src/containers/AdminDashboard/utils';
import commonUtils from 'src/lib/commonUtils';

vi.mock('axios');

describe('Admin Dash utils', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('putAPI and update content when status is 200', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '', comments: '', type: '' };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getContent = vi.fn();

    vi.mocked(axios.request).mockResolvedValueOnce({ status: 200 });

    await utils.putAPI(data, auth, getContent);

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/one?type=${data.type}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(getContent).toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });
  it('putAPI when status is 400', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '', comments: '', type: '' };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getContent = vi.fn();
    const notifyMock = vi.fn();
    notifyMock.mockReturnValueOnce(undefined);
    vi.mocked(axios.request).mockRejectedValueOnce({ status: 400 });
    await utils.putAPI(data, auth, getContent);
    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/one?type=${data.type}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(getContent).not.toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });
  it('handlePutError with status 400', async () => {
    const data = { title: '', comments: '', type: '' };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const e = { status: 400 };
    vi.mocked(axios.request).mockRejectedValueOnce(new AxiosError('error'));
    commonUtils.notify = vi.fn();
    await utils.handlePutError(e as AxiosError, data, auth);
    expect(commonUtils.notify).toHaveBeenCalled();
    expect(axios.request).toHaveBeenCalled();
  });
  it('handlePutError with status 500', async () => {
    const data = { title: '', comments: '', type: '' };
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const e = { status: 500 };
    vi.mocked(axios.request).mockRejectedValueOnce(new AxiosError('error'));
    commonUtils.notify = vi.fn();
    await utils.handlePutError(e as AxiosError, data, auth);
    expect(commonUtils.notify).toHaveBeenCalled();
  });
  it('successfully adds news', async () => {
    commonUtils.notify = vi.fn();
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getContent = vi.fn();
    const dialogData = { title: '', url: '', comments: '' };
    const clearForm = vi.fn();
    vi.mocked(axios.request).mockResolvedValueOnce({ status: 201 });
    await utils.addNewsAPI(auth, getContent, clearForm, dialogData);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: {
        ...dialogData,
        type: 'Forum',
        access: 'CLC',
      },
    });
    expect(clearForm).toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });
  it('catches news error', async () => {
    commonUtils.notify = vi.fn();
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const getContent = vi.fn();
    const dialogData = { title: '', url: '', comments: '' };
    const clearForm = vi.fn();
    const err = new Error('error');
    vi.mocked(axios.request).mockRejectedValueOnce(err);
    await utils.addNewsAPI(auth, getContent, clearForm, dialogData);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: {
        ...dialogData,
        type: 'Forum',
        access: 'CLC',
      },
    });
    expect(clearForm).not.toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });
  it('successfully adds a pic', async () => {
    commonUtils.notify = vi.fn();
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const data = { title: '' };
    const getPictures = vi.fn();
    const setShowDialog = vi.fn();
    vi.mocked(axios.request).mockResolvedValueOnce({ status: 201 });
    await utils.createPicAPI(getPictures, setShowDialog, data, auth);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(commonUtils.notify).toHaveBeenCalled();
    expect(setShowDialog).toHaveBeenCalledWith(false);
  });
  it('catches pic error', async () => {
    commonUtils.notify = vi.fn();
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const data = { title: '' };
    const getPictures = vi.fn();
    const setShowDialog = vi.fn();
    const err = new Error('error');
    vi.mocked(axios.request).mockRejectedValueOnce(err);
    await utils.createPicAPI(getPictures, setShowDialog, data, auth);
    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(commonUtils.notify).toHaveBeenCalled();
  });
});
