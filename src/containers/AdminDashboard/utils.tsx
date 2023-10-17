import type { Iauth } from 'src/providers/Auth.provider';
import commonUtils from 'src/lib/commonUtils';
import axios, { AxiosError } from 'axios';

async function handlePutError(e: AxiosError,
  data: { title: string; comments: string; type: string },
  auth: Iauth,
) {
  if ((e).status === 400) {
    try {
      const config = { // creating a new book here
        url: `${process.env.BackendUrl}/book`,
        method: 'post',
        headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
        data,
      };
      await axios.request(config);
      commonUtils.notify(data.type, 'Successfully created', 'success');
    } catch (err) {
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
    const config = {
      url: `${process.env.BackendUrl}/book/one?type=${data.type}`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    };
    const { status } = await axios.request(config);
    if (status === 200) {
      await getContent();
      commonUtils.notify(data.type, 'successfully updated', 'success');
    }
  } catch (e) {
    await handlePutError(e as AxiosError, data, auth);
  }
}

async function addNewsAPI(
  auth: Iauth,
  getNews: () => Promise<void>,
  clearForm: () => void,
  dialogData: { title: string, url: string | undefined, comments: string | undefined },
): Promise<void> {
  try {
    const data = {
      ...dialogData,
      type: 'Forum',
      access: 'CLC',
    };
    const config = {
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,

    };
    const { status } = await axios.request(config);
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
    const config = {
      url: `${process.env.BackendUrl}/book`,
      method: 'post',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data,
    };
    const { status } = await axios.request(config);
    if (status === 201) {
      commonUtils.notify(`${data.title}`, 'Successfully added picture', 'success');
      await getPictures();
      setShowDialog(false);
    }
  } catch (e) {
    commonUtils.notify(`${data.title}`, `Failed to add picture, ${(e as Error).message}`, 'warning');
  }
}

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
