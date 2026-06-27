import type { Iauth } from 'src/providers/Auth.provider';
import commonUtils from 'src/lib/commonUtils';

export type HttpError = Error & { status?: number };

async function jsonRequest(
  url: string,
  init: RequestInit,
): Promise<{ status: number }> {
  const res = await fetch(url, init);
  if (!res.ok) {
    const err: HttpError = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return { status: res.status };
}

async function handlePutError(e: HttpError,
  data: { title: string; comments: string; type: string },
  auth: Iauth,
) {
  if (e.status === 400) {
    try {
      await jsonRequest(`${process.env.BackendUrl}/book`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      commonUtils.notify(data.type, 'Successfully created', 'success');
    } catch {
      commonUtils.notify(data.type, `Failed to create ${data.type}, ${(e as Error).message}`, 'warning');
    }
  } else {
    commonUtils.notify(data.type, `Failed to update ${data.type}, ${(e as Error).message}`, 'warning');
  }
}

async function putAPI(
  data: { title: string; comments: string; type: string; enabled?: boolean },
  auth: Iauth,
  getContent: () => Promise<void>,
): Promise<void> {
  try {
    const { status } = await jsonRequest(`${process.env.BackendUrl}/book/one?type=${data.type}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (status === 200) {
      await getContent();
      commonUtils.notify(data.type, 'successfully updated', 'success');
    }
  } catch (e) {
    await handlePutError(e as HttpError, data, auth);
  }
}

async function addNewsAPI(
  auth: Iauth,
  getNews: () => Promise<void>,
  clearForm: () => void,
  dialogData: { title: string, url: string | undefined, comments: string | undefined },
): Promise<void> {
  const data = {
    ...dialogData,
    type: 'Forum',
    access: 'CLC',
  };
  try {
    const { status } = await jsonRequest(`${process.env.BackendUrl}/book`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (status === 201) {
      await getNews();
      clearForm();
      commonUtils.notify(data.title, 'Successfully added news', 'success');
    }
  } catch (e) {
    commonUtils.notify(dialogData.title, `Failed to add news, ${(e as Error).message}`, 'warning');
  }
}

async function createPicAPI(
  getPictures: () => Promise<void>, setShowDialog: (arg0: boolean) => void,
  data: Record<string, unknown>, auth: Iauth,
): Promise<void> {
  try {
    const { status } = await jsonRequest(`${process.env.BackendUrl}/book`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (status === 201) {
      commonUtils.notify(`${data.title}`, 'Successfully added picture', 'success');
      await getPictures();
      setShowDialog(false);
    }
  } catch (e) {
    commonUtils.notify(`${data.title}`, `Failed to add picture, ${(e as Error).message}`, 'warning');
  }
}

// Must match the version web-jam-back's FacebookController is pinned to.
export const FB_GRAPH_VERSION = 'v20.0';

interface FbLoginResponse { authResponse?: { accessToken?: string } }
interface FbSdk {
  init: (opts: Record<string, unknown>) => void;
  login: (cb: (res: FbLoginResponse) => void, opts: { scope: string; auth_type?: string }) => void;
}
interface FbWindow extends Window { FB?: FbSdk; fbAsyncInit?: () => void }

// Load the Facebook JS SDK once (on the admin page only). App id is public, so
// it's safe in the bundle; FB.init reads it from the env-injected value.
function loadFbSdk(): void {
  /* istanbul ignore if */
  if (typeof window === 'undefined') return;
  const w = window as unknown as FbWindow;
  if (w.FB || document.getElementById('facebook-jssdk')) return;
  w.fbAsyncInit = () => {
    w.FB?.init({
      appId: process.env.FB_APP_ID, version: FB_GRAPH_VERSION, cookie: false, xfbml: false,
    });
  };
  const js = document.createElement('script');
  js.id = 'facebook-jssdk';
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  document.body.appendChild(js);
}

// PUT the short-lived user token to web-jam-back, which derives + stores the
// never-expiring page token (the app secret stays server-side). Split out of
// the FB.login callback because that callback must be a plain function — the
// Facebook SDK rejects an async callback ("Expression is of type asyncfunction,
// not function").
async function sendPageToken(userToken: string, auth: Iauth): Promise<void> {
  try {
    const res = await fetch(`${process.env.BackendUrl}/facebook/token`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${auth.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userToken }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({})) as { message?: string };
      throw new Error(body.message || `HTTP ${res.status}`);
    }
    commonUtils.notify('Facebook', 'Reconnected — the feed will refresh shortly', 'success');
  } catch (e) {
    commonUtils.notify('Facebook', `Reconnect failed, ${(e as Error).message}`, 'warning');
  }
}

// "Reconnect Facebook": admin logs in as the page admin → short-lived user
// token → sendPageToken to web-jam-back. `auth_type: 'rerequest'` forces the
// page picker every time rather than silently reusing the last grant, so a
// prior reconnect of a different page can't leave this one ungranted. Keep BOTH
// the CollegeLutheran and WebJamLLC pages checked — deselecting one revokes it.
async function reconnectFacebookAPI(auth: Iauth): Promise<void> {
  const w = window as unknown as FbWindow;
  if (!w.FB) {
    commonUtils.notify('Facebook', 'Facebook is still loading — wait a moment and try again', 'warning');
    return;
  }
  await new Promise<void>((resolve) => {
    w.FB!.login((response: FbLoginResponse) => {
      const userToken = response?.authResponse?.accessToken;
      if (!userToken) {
        commonUtils.notify('Facebook', 'Login was cancelled', 'warning');
        resolve();
        return;
      }
      sendPageToken(userToken, auth).finally(resolve);
    }, { scope: 'pages_show_list,pages_read_engagement', auth_type: 'rerequest' });
  });
}

export const defaultPic = {
  url: '', comments: '', title: '', type: '', _id: '',
};

export interface FormParams {
  title: string;
  comments: string;
  type: string;
  name: string;
}

export default {
  addNewsAPI,
  putAPI,
  createPicAPI,
  handlePutError,
  loadFbSdk,
  reconnectFacebookAPI,
};
