import axios from 'axios';
import { Iauth } from 'src/providers/Auth.provider';
import { Ibook } from 'src/providers/utils';

export const defaultNews = {
  url: '', comments: '', title: '', _id: '', type: 'Forum',
} as Ibook;

export async function performAxiosRequest(
  config:any,
  getNews: () => Promise<void>,
  setEditNews: (arg0: typeof defaultNews) => void,
): Promise<void> {
  try {
    const { status } = await axios.request(config);
    if (status === 200) {
      setEditNews(defaultNews);
      await getNews();
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}

// async function updateNews(
//   editNews: typeof defaultNews,
//   auth: Iauth,
//   getNews: () => Promise<void>,
//   setEditNews: (arg0:typeof defaultNews) => void,
// ): Promise<void> {
//   const url = `${process.env.BackendUrl}/book/${editNews._id}`;
//   const config = {
//     url,
//     method: 'put',
//     headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
//     data: editNews,
//   };
//   await performAxiosRequest(config, getNews, setEditNews);
// }

// export async function deleteNews(
//   editNews: typeof defaultNews,
//   getNews: () => Promise<void>,
//   auth: Iauth,
//   setEditNews: (arg0: typeof defaultNews) => void,
// ): Promise<void> {
//   const url = `${process.env.BackendUrl}/book/${editNews._id}`;
//   const config = {
//     url,
//     method: 'delete',
//     headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
//     data: editNews,
//   };
//   await performAxiosRequest(config, getNews, setEditNews);
// }
async function newsApi(
  method:string,
  editNewsState: { editNews: typeof defaultNews, setEditNews: (arg0:typeof defaultNews) => void },
  auth: Iauth,
  getNews: () => Promise<void>,
): Promise<void> {
  const { editNews, setEditNews } = editNewsState;
  const url = `${process.env.BackendUrl}/book/${editNews._id}`;
  const config = {
    url,
    method,
    headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
    data: editNews,
  };
  await performAxiosRequest(config, getNews, setEditNews);
}

export default { newsApi, performAxiosRequest };
