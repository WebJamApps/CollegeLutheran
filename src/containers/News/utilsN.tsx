import axios from 'axios';
import { Iauth } from 'src/providers/Auth.provider';
import { Ibook } from 'src/providers/utils';

export const defaultNews = {
  url: '', comments: '', title: '', _id: '', type: 'Forum',
} as Ibook;

export async function performAxiosRequest(
  method: 'put' | 'delete',
  url: string,
  editNews: typeof defaultNews,
  auth: Iauth,
  getNews: () => Promise<void>,
  setEditNews: (arg0: typeof defaultNews) => void,
): Promise<void> {
  try {
    const config = {
      url,
      method,
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    };
    const { status } = await axios.request(config);
    if (status === 200) {
      setEditNews(defaultNews);
      await getNews();
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}

async function updateNews(
  editNews: typeof defaultNews,
  auth: Iauth,
  getNews: () => Promise<void>,
  setEditNews: (arg0:typeof defaultNews) => void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editNews._id}`;
  await performAxiosRequest('put', url, editNews, auth, getNews, setEditNews);
}

export async function deleteNews(
  editNews: typeof defaultNews,
  getNews: () => Promise<void>,
  auth: Iauth,
  setEditNews: (arg0: typeof defaultNews) => void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editNews._id}`;
  await performAxiosRequest('delete', url, editNews, auth, getNews, setEditNews);
}

const makeShowHideBulletin = (setNews: (arg0:typeof defaultNews) => void,
  news: typeof defaultNews,
) => (evt: any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'worshipbulletin' : '';
  setNews({ ...news, comments });
};
export default { updateNews, deleteNews, makeShowHideBulletin };
