import axios from 'axios';
import { putAPI, addNewsAPI, createPicAPI } from 'src/containers/AdminDashboard/utils';
import commonUtils from 'src/lib/commonUtils';

jest.mock('axios');

describe('Admin Dash utils', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('putAPI and update content when status is 200', async () => {
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
    const getContent = jest.fn();
    const notifyMock = jest.fn();

    (axios.request as jest.Mock).mockResolvedValueOnce({ status: 200 });
    jest.mock('src/lib/commonUtils', () => ({
      ...jest.requireActual('src/lib/commonUtils'),
      notify: notifyMock,
    }));

    await putAPI(data, auth, getContent);

    expect(axios.request).toHaveBeenCalledTimes(1);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/one?type=${data.type}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(getContent).toHaveBeenCalled();
  });
  it('putAPI when status is 400', async () => {
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
    const getContent = jest.fn();
    const notifyMock = jest.fn();
    notifyMock.mockReturnValueOnce(undefined);
    (axios.request as jest.Mock).mockRejectedValueOnce({ status: 400 });

    jest.mock('src/lib/commonUtils', () => ({
      ...jest.requireActual('src/lib/commonUtils'),
      notify: notifyMock,
    }));
    await putAPI(data, auth, getContent);

    expect(axios.request).toHaveBeenCalledTimes(2);
    expect(axios.request).toHaveBeenCalledWith({
      url: `${process.env.BackendUrl}/book/one?type=${data.type}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    });
    expect(getContent).not.toHaveBeenCalled();
  });
  it('successfully adds news', async () => {
    commonUtils.notify = jest.fn();
    const auth = {
      isAuthenticated: true,
      error: 'string',
      token: 'string',
      user: {
        userType: 'string',
        email: 'string',
      },
    };
    const dialogData = { title: '', url: '', comments: '' };
    const clearForm = jest.fn();
    (axios.request as jest.Mock).mockResolvedValueOnce({ status: 201 });
    await addNewsAPI(auth, clearForm, dialogData);
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
  it('successfully adds a pic', async () => {
    commonUtils.notify = jest.fn();
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
    const getPictures = jest.fn();
    const setShowDialog = jest.fn();
    (axios.request as jest.Mock).mockResolvedValueOnce({ status: 201 });
    await createPicAPI(getPictures, setShowDialog, data, auth);
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
});
