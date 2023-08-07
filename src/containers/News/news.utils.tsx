import axios from 'axios';
import commonUtils from 'src/lib/commonUtils';
import { Iauth } from 'src/providers/Auth.provider';
import { Ibook } from 'src/providers/utils';

export const defaultNews = {
  url: '', comments: '', title: '', _id: '', type: 'Forum',
} as Ibook;

async function updateNews(
  editNews: typeof defaultNews,
  auth: Iauth,
  getNews: () => Promise<void>,
  setEditNews: (arg0:typeof defaultNews) => void,
  setIsSubmitting: (arg0:boolean) => void,
): Promise<void> {
  try {
    setIsSubmitting(true);
    const { token } = auth;
    const config = {
      url: `${process.env.BackendUrl}/book`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      data: editNews,
    };
    // const { status } = await axios.put(config.url, { editNews, token });
    const { status } = await axios.request(config);
    if (status === 200) {
      await commonUtils.delay(2);
      setIsSubmitting(false);
      setEditNews(defaultNews);
      await getNews();
    }
  } catch (err) { console.log((err as Error).message); }
}

async function deleteNews(
  getNews: () => Promise<void>,
  auth: Iauth,
  setEditNews: (arg0: typeof defaultNews) => void,
  setIsSubmitting: (arg0: boolean) => void,
): Promise<void> {
  try {
    setIsSubmitting(true);
    const config = {
      url: `${process.env.BackendUrl}/book`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
    };
    const { status } = await axios.delete(config.url);
    if (status === 200) {
      await commonUtils.delay(2);
      setIsSubmitting(false);
      setEditNews(defaultNews);
      await getNews();
    }
  } catch (err) { console.log((err as Error).message); }
}

const makeShowHideCaption = (setNews: (arg0: typeof defaultNews) => void, news: typeof defaultNews) => (evt: any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'worshipbulletin' : '';
  setNews({ ...news, comments });
};

export default { updateNews, deleteNews, makeShowHideCaption };
