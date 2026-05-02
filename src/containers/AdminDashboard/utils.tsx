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
  data: { title: string; comments: string; type: string },
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
};
