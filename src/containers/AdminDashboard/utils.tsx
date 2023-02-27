import type { Dispatch } from 'react';
import type { Iauth } from 'src/providers/Auth.provider';
import superagent from 'superagent';
import Fetch from 'src/lib/fetch';
import commonUtils from 'src/lib/commonUtils';

// async function createBook(data: any, auth:any): Promise<string> {
//   if (data.type === '') data.type = 'otherPics';
//   try {
//     const res = await Fetch.fetchPost(superagent, auth, data);
//     if (res.status === 201) {
//       window.location.reload();
//       return `${res.status}`;
//     }
//   } catch (e) { return `${(e as Error).message}`; }
//   return 'Did not create book';
// }

async function putAPI(
  body:{ title:string;comments:string;type:string },
  auth:Iauth, dispatch:Dispatch<unknown>,
):Promise<void> {
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
  auth: Iauth, title: string, url: string, comments: string,
): Promise<void> {
  try {
    await superagent.post(`${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`)
      .set('Accept', 'application/json')
      .send({
        title,
        url,
        comments,
        type: 'Forum',
        access: 'CLC',
      });
    commonUtils.notify(title, 'Successfully updated news', 'success');
  } catch (e) {
    commonUtils.notify(title, `Failed to update news, ${(e as Error).message}`, 'warning');
  }
}

export default {
  addNewsAPI,
  putAPI,
};
