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
    // TODO use Axios not superagent
    // TODO use provider for homePageContent not redux
    const res = await superagent.put(`${process.env.BackendUrl}/book/one?type=${body.type}`)
      .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
      .send(body);
    if (res.status === 200) { // TODO call getHomePageContent from new provider
      await Fetch.fetchGet(dispatch, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
      commonUtils.notify('Homepage', 'sucessfully updated', 'success');
    }
  } catch (e) {
    console.log((e as any).response.status);
    if ((e as any).response.status === 400) {
      try {
        await superagent.post(`${process.env.BackendUrl}/book`)
          .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
          .send(body);
        console.log('you made a new one, yay');
        // TODO use react notification to display a success toast message
        // TODO call getHomePageContent from new provider
      } catch (err) {
        console.log((err as Error).message);
        // TODO use react notification to display a error toast message
      }
    }
  }
}

async function addNewsAPI(
  auth: Iauth,
  dispatch: Dispatch<AnyAction>, clearForm: () => void,
  title: string, url: string, comments: string,
): Promise<void> {
  try {
    await superagent.post(
      `${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`,
    )
      .set('Accept', 'application/json')
      .send({
        title,
        url,
        comments,
        type: 'Forum',
        access: 'CLC',
      });
    await Fetch.fetchGet(dispatch, 'book?type=Forum', 'GOT_BOOKS');
    clearForm();
    commonUtils.notify(title, 'Successfully added news', 'success');
  } catch (e) {
    commonUtils.notify(title, `Failed to add news, ${(e as Error).message}`, 'warning');
  }
}

export default {
  addNewsAPI,
  putAPI,
};
