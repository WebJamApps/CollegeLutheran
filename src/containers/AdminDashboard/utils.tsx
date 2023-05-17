import type { Iauth } from 'src/providers/Auth.provider';
import Fetch from 'src/lib/fetch';
import commonUtils from 'src/lib/commonUtils';
import type { AnyAction, Dispatch } from 'redux';
import axios from 'axios';

export async function putAPI(
  data: { title: string; comments: string; type: string },
  auth: Iauth, getContent: () => Promise<void>,
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
    if ((e as any).status === 400) {
      try {
        const config = {
          url: `${process.env.BackendUrl}/book`,
          method: 'post',
          headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
          data,
        };
        await axios.request(config);
      } catch (err) {
        commonUtils.notify('Homepage', `Failed to update homepage, ${(e as Error).message}`, 'warning');
        console.log((err as Error).message);
      }
    }
  }
}

export async function addNewsAPI(
  auth: Iauth,
  dispatch: Dispatch<AnyAction>, clearForm: () => void,
  dialogData: { title: string, url: string, comments: string },
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
      await Fetch.fetchGet(dispatch, 'book?type=Forum', 'GOT_BOOKS');
      clearForm();
      commonUtils.notify(data.title, 'Successfully added news', 'success');
    }
  } catch (e) {
    commonUtils.notify(dialogData.title, `Failed to add news, ${(e as Error).message}`, 'warning');
  }
}

export async function createPicAPI(
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
    console.log(status);
    if (status === 201) {
      commonUtils.notify(`${data.title}`, 'Successfully added picture', 'success');
      await getPictures();
      setShowDialog(false);
    }
  } catch (e) {
    commonUtils.notify(`${data.title}`, `Failed to add picture, ${(e as Error).message}`, 'warning');
  }
}

export default {
  addNewsAPI,
  putAPI,
  createPicAPI,
};
