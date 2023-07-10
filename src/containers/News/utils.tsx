import { Button } from '@mui/material';
import { useContext } from 'react';
import { AuthContext, Iauth } from 'src/providers/Auth.provider';
import axios from 'axios';
import commonUtils from 'src/lib/commonUtils';
import utils from '../AdminDashboard/utils';

// export function EditButton(
//   {
//     getNews,
//     dialogData,
//   }: {
//     getNews: () => Promise<void>,
//     dialogData: { title: string, url: string | undefined, comments: string | undefined },
//   },
// ): JSX.Element {
//   const { auth } = useContext(AuthContext);
//   return (
//     <div style={{ marginBottom: '10px', float: 'right' }}>
//       <Button
//         size="small"
//         variant="contained"
//         type="button"
//         onClick={() => utils.editAPI(auth, getNews, dialogData)}
//       >
//         Edit
//       </Button>
//     </div>
//   );
// }

// function DeleteButton(
//   {
//     getNews,
//     dialogData,
//   }: {
//     getNews: () => Promise<void>,
//     dialogData: { title: string, url: string | undefined, comments: string | undefined },
//   },
// ): JSX.Element {
//   const { auth } = useContext(AuthContext);
//   return (
//     <div style={{ marginBottom: '10px', float: 'right' }}>
//       <Button
//         size="small"
//         variant="contained"
//         type="button"
//         onClick={() => utils.deleteAPI(auth, getNews, dialogData)}
//       >
//         Delete
//       </Button>
//     </div>
//   );
// }

export const defaultNews = {
  url: '', comments: '', title: '', _id: undefined as string | undefined, type: 'Forum',
};

async function updateNews(
  editNews: typeof defaultNews,
  auth: Iauth,
  getNews: () => Promise<void>,
  setEditNews: (arg0:typeof defaultNews) => void,
  setShowTable:(arg0:boolean) => void,
  setIsSubmitting: (arg0:boolean) => void,
//   dialogData: { title: string, url: string | undefined, comments: string | undefined },
): Promise<void> {
  try {
    setIsSubmitting(true);
    const { token } = auth;
    // const data = {
    //   ...dialogData,
    //   type: 'Forum',
    //   access: 'CLC',
    // };
    const config = {
      url: `${process.env.BackendUrl}/book`,
      method: 'put',
      headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
      // data,
    };
    const { status } = await axios.put(config.url, { editNews, token });
    if (status === 200) {
      await commonUtils.delay(2);
      setIsSubmitting(false);
      setEditNews(defaultNews);
      await getNews();
      setShowTable(false);
    }
  } catch (err) { console.log((err as Error).message); }
}

async function deleteNews(
  getNews: () => Promise<void>,
  setEditNews: (arg0: typeof defaultNews) => void,
  setShowTable: (arg0:boolean) => void,
  setIsSubmitting: (arg0: boolean) => void,
): Promise<void> {
  try {
    setIsSubmitting(true);
    const config = { url: `${process.env.BackendUrl}/book` };
    const { status } = await axios.delete(config.url);
    if (status === 200) {
      await commonUtils.delay(2);
      setIsSubmitting(false);
      setEditNews(defaultNews);
      await getNews();
      setShowTable(false);
    }
  } catch (err) { console.log((err as Error).message); }
}

const makeShowHideCaption = (setNews: (arg0: typeof defaultNews) => void, news: typeof defaultNews) => (evt: any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'worshipbulletin' : '';
  setNews({ ...news, comments });
};

export default {
//   EditButton, DeleteButton,
  makeShowHideCaption, updateNews, deleteNews,
};
