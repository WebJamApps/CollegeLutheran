/* eslint-disable @typescript-eslint/no-explicit-any */
import utils, { HttpError } from 'src/containers/AdminDashboard/utils';
import commonUtils from 'src/lib/commonUtils';

const auth = {
  isAuthenticated: true,
  error: 'string',
  token: 'string',
  user: { userType: 'string', email: 'string' },
};

const jsonHeaders = {
  Authorization: `Bearer ${auth.token}`,
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

describe('Admin Dash utils', () => {
  afterEach(() => { vi.unstubAllGlobals(); });

  it('putAPI and update content when status is 200', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '', comments: '', type: '' };
    const getContent = vi.fn();
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true, status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await utils.putAPI(data, auth, getContent);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.BackendUrl}/book/one?type=${data.type}`,
      { method: 'PUT', headers: jsonHeaders, body: JSON.stringify(data) },
    );
    expect(getContent).toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });

  it('putAPI when status is 400 (creates the resource via fallback POST)', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '', comments: '', type: '' };
    const getContent = vi.fn();
    const fetchMock = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 400 })
      .mockResolvedValueOnce({ ok: true, status: 201 });
    vi.stubGlobal('fetch', fetchMock);

    await utils.putAPI(data, auth, getContent);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      `${process.env.BackendUrl}/book/one?type=${data.type}`,
      { method: 'PUT', headers: jsonHeaders, body: JSON.stringify(data) },
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      `${process.env.BackendUrl}/book`,
      { method: 'POST', headers: jsonHeaders, body: JSON.stringify(data) },
    );
    expect(getContent).not.toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });

  it('handlePutError with status 400', async () => {
    const data = { title: '', comments: '', type: '' };
    const e: HttpError = Object.assign(new Error('error'), { status: 400 });
    const fetchMock = vi.fn(() => Promise.reject(new Error('boom')));
    vi.stubGlobal('fetch', fetchMock);
    commonUtils.notify = vi.fn();
    await utils.handlePutError(e, data, auth);
    expect(commonUtils.notify).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalled();
  });

  it('handlePutError with status 500', async () => {
    const data = { title: '', comments: '', type: '' };
    const e: HttpError = Object.assign(new Error('error'), { status: 500 });
    commonUtils.notify = vi.fn();
    await utils.handlePutError(e, data, auth);
    expect(commonUtils.notify).toHaveBeenCalled();
  });

  it('successfully adds news', async () => {
    commonUtils.notify = vi.fn();
    const getContent = vi.fn();
    const dialogData = { title: '', url: '', comments: '' };
    const clearForm = vi.fn();
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true, status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    await utils.addNewsAPI(auth, getContent, clearForm, dialogData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.BackendUrl}/book`,
      {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({ ...dialogData, type: 'Forum', access: 'CLC' }),
      },
    );
    expect(clearForm).toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });

  it('catches news error', async () => {
    commonUtils.notify = vi.fn();
    const getContent = vi.fn();
    const dialogData = { title: '', url: '', comments: '' };
    const clearForm = vi.fn();
    const fetchMock = vi.fn(() => Promise.reject(new Error('error')));
    vi.stubGlobal('fetch', fetchMock);
    await utils.addNewsAPI(auth, getContent, clearForm, dialogData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(clearForm).not.toHaveBeenCalled();
    expect(commonUtils.notify).toHaveBeenCalled();
  });

  it('successfully adds a pic', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '' };
    const getPictures = vi.fn();
    const setShowDialog = vi.fn();
    const fetchMock = vi.fn(() => Promise.resolve({ ok: true, status: 201 }));
    vi.stubGlobal('fetch', fetchMock);
    await utils.createPicAPI(getPictures, setShowDialog, data, auth);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `${process.env.BackendUrl}/book`,
      { method: 'POST', headers: jsonHeaders, body: JSON.stringify(data) },
    );
    expect(commonUtils.notify).toHaveBeenCalled();
    expect(setShowDialog).toHaveBeenCalledWith(false);
  });

  it('catches pic error', async () => {
    commonUtils.notify = vi.fn();
    const data = { title: '' };
    const getPictures = vi.fn();
    const setShowDialog = vi.fn();
    const fetchMock = vi.fn(() => Promise.reject(new Error('error')));
    vi.stubGlobal('fetch', fetchMock);
    await utils.createPicAPI(getPictures, setShowDialog, data, auth);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(commonUtils.notify).toHaveBeenCalled();
  });
});
