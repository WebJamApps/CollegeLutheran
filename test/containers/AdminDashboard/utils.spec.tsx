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

  describe('Facebook reconnect', () => {
    afterEach(() => {
      delete (window as any).FB;
      const existing = document.getElementById('facebook-jssdk');
      if (existing) existing.remove();
    });

    it('loadFbSdk appends the SDK script once', () => {
      utils.loadFbSdk();
      expect(document.getElementById('facebook-jssdk')).not.toBeNull();
      utils.loadFbSdk(); // idempotent — no duplicate
      expect(document.querySelectorAll('#facebook-jssdk')).toHaveLength(1);
    });

    it('loadFbSdk does nothing once FB is present', () => {
      (window as any).FB = { init: vi.fn(), login: vi.fn() };
      utils.loadFbSdk();
      expect(document.getElementById('facebook-jssdk')).toBeNull();
    });

    it('warns when the SDK is not loaded yet', async () => {
      commonUtils.notify = vi.fn();
      await utils.reconnectFacebookAPI(auth as any);
      expect(commonUtils.notify).toHaveBeenCalledWith('Facebook', expect.stringMatching(/still loading/), 'warning');
    });

    it('PUTs the user token (rerequesting the page picker) and notifies success', async () => {
      commonUtils.notify = vi.fn();
      const loginMock = vi.fn((cb: (r: any) => void) => cb({ authResponse: { accessToken: 'USER-TOKEN' } }));
      (window as any).FB = { init: vi.fn(), login: loginMock };
      const fetchMock = vi.fn(() => Promise.resolve({ ok: true, status: 200 }));
      vi.stubGlobal('fetch', fetchMock);
      await utils.reconnectFacebookAPI(auth as any);
      expect(loginMock).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({ auth_type: 'rerequest' }),
      );
      expect(fetchMock).toHaveBeenCalledWith(
        `${process.env.BackendUrl}/facebook/token`,
        {
          method: 'PUT',
          headers: jsonHeaders,
          body: JSON.stringify({ userToken: 'USER-TOKEN' }),
        },
      );
      expect(commonUtils.notify).toHaveBeenCalledWith('Facebook', expect.stringMatching(/Reconnected/), 'success');
    });

    it('warns when login is cancelled', async () => {
      commonUtils.notify = vi.fn();
      (window as any).FB = { init: vi.fn(), login: (cb: (r: any) => void) => cb({}) };
      await utils.reconnectFacebookAPI(auth as any);
      expect(commonUtils.notify).toHaveBeenCalledWith('Facebook', expect.stringMatching(/cancelled/), 'warning');
    });

    it('surfaces the backend error message when the PUT fails', async () => {
      commonUtils.notify = vi.fn();
      (window as any).FB = {
        init: vi.fn(),
        login: (cb: (r: any) => void) => cb({ authResponse: { accessToken: 'USER-TOKEN' } }),
      };
      vi.stubGlobal('fetch', vi.fn(() => Promise.resolve({
        ok: false, status: 400, json: () => Promise.resolve({ message: 'CollegeLutheran page not found in /me/accounts' }),
      })));
      await utils.reconnectFacebookAPI(auth as any);
      expect(commonUtils.notify).toHaveBeenCalledWith(
        'Facebook', expect.stringMatching(/Reconnect failed.*page not found/), 'warning',
      );
    });
  });
});
