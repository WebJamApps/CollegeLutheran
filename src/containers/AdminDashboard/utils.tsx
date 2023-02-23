import type { Iauth } from 'src/providers/Auth.provider';
import superagent from 'superagent';
// import Fetch from '../../lib/fetch';

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
  auth:Iauth,
):Promise<void> {
  try {
    // TODO use Axios not superagent
    // TODO use provider for homePageContent not redux
    const res = await superagent.put(`${process.env.BackendUrl}/book/one?type=${body.type}`)
      .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
      .send(body);
    if (res.status === 200) {
      console.log('good job');
      // TODO use react notification to display a success toast message
      // TODO call getHomePageContent from new provider
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

export default {
  // createBook,
  putAPI,
};
