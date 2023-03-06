import type { Iauth } from 'src/providers/Auth.provider';
import Fetch from 'src/lib/fetch';
import commonUtils from 'src/lib/commonUtils';
import type { AnyAction, Dispatch } from 'redux';
import axios from 'axios';

async function putAPI(// used to update the text the homepage or on the youthpage
  data: { title: string; comments: string; type: string },
  auth: Iauth, dispatch: Dispatch<AnyAction>,
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
      await Fetch.fetchGet(dispatch, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
      commonUtils.notify('Homepage', 'sucessfully updated', 'success');
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
        console.log((err as Error).message);
      }
    }
  }
}

async function addNewsAPI(
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
    console.log(status);
    if (status === 201) {
      await Fetch.fetchGet(dispatch, 'book?type=Forum', 'GOT_BOOKS');
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
    console.log(status);
    if (status === 201) {
      await getPictures();
      setShowDialog(false);
    }
  } catch (e) { console.log((e as Error).message); }
}

export default {
  addNewsAPI,
  putAPI,
  createPicAPI,
};
