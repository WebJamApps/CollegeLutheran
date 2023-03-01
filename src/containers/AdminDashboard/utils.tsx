import type { Iauth } from 'src/providers/Auth.provider';
import superagent from 'superagent';
import Fetch from 'src/lib/fetch';
import commonUtils from 'src/lib/commonUtils';
import type { AnyAction, Dispatch } from 'redux';

async function putAPI(
  body: { title: string; comments: string; type: string },
  auth: Iauth, dispatch: Dispatch<AnyAction>,
): Promise<void> {
  try {
    const res = await superagent.put(`${process.env.BackendUrl}/book/one?type=${body.type}`)
      .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
      .send(body);
    if (res.status === 200) {
      await Fetch.fetchGet(dispatch, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
      commonUtils.notify('Homepage', 'sucessfully updated', 'success');
    }
  } catch (e) {
    if ((e as any).response.status === 400) {
      try {
        await superagent.post(`${process.env.BackendUrl}/book`)
          .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
          .send(body);
      } catch (err) {
        console.log((err as Error).message);
      }
    }
  }
}

async function addNewsAPI(
  auth: Iauth,
  dispatch: Dispatch<AnyAction>, clearForm: () => void,
  body: { title: string, url: string, comments: string },
): Promise<void> {
  try {
    await superagent.post(
      `${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`,
    )
      .set('Accept', 'application/json')
      .send({
        ...body,
        type: 'Forum',
        access: 'CLC',
      });
    await Fetch.fetchGet(dispatch, 'book?type=Forum', 'GOT_BOOKS');
    clearForm();
    commonUtils.notify(body.title, 'Successfully added news', 'success');
  } catch (e) {
    commonUtils.notify(body.title, `Failed to add news, ${(e as Error).message}`, 'warning');
  }
}

async function createPicAPI(
  getPictures: () => Promise<void>, setShowDialog: (arg0: boolean) => void,
  pic: Record<string, unknown>, auth: Iauth,
): Promise<void> {
  try {
    await superagent.post(`${process.env.BackendUrl}/book`)
      .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
      .send(pic);
    await getPictures();
    setShowDialog(false);
  } catch (e) { console.log((e as Error).message); }
}

export default {
  addNewsAPI,
  putAPI,
  createPicAPI,
};
