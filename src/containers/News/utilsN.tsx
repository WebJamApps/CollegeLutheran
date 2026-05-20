import { Iauth } from 'src/providers/Auth.provider';
import { Ibook } from 'src/providers/utils';

export const defaultNews = {
  url: '', comments: '', title: '', _id: '', type: 'Forum',
} as Ibook;

export async function performFetchRequest(
  url: string,
  init: RequestInit,
  getNews: () => Promise<void>,
  setEditNews: (arg0: typeof defaultNews) => void,
): Promise<void> {
  try {
    const res = await fetch(url, init);
    if (res.status === 200) {
      setEditNews(defaultNews);
      await getNews();
    }
  } catch (err) {
    console.error((err as Error).message);
  }
}

async function newsApi(
  method: string,
  editNewsState: { editNews: typeof defaultNews, setEditNews: (arg0: typeof defaultNews) => void },
  auth: Iauth,
  getNews: () => Promise<void>,
): Promise<void> {
  const { editNews, setEditNews } = editNewsState;
  const url = `${process.env.BackendUrl}/book/${editNews._id}`;
  await performFetchRequest(url, {
    method: method.toUpperCase(),
    headers: {
      Authorization: `Bearer ${auth.token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(editNews),
  }, getNews, setEditNews);
}

export default { newsApi, performFetchRequest };
