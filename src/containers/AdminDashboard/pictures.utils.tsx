import axios from 'axios';
import { Iauth } from 'src/providers/Auth.provider';

export const defaultPic = {
  url: '', title: '', comments: '', _id: undefined as string | undefined, type: 'pics',
};

const makeShowHideCaption = (setPic: (arg0:typeof defaultPic) => void, pic: typeof defaultPic) => (evt:any) => {
  const { target: { checked } } = evt;
  const comments = checked ? 'showCaption' : '';
  setPic({ ...pic, comments });
};

export async function performAxiosRequest(
  config:any,
  // method: 'put' | 'delete',
  // url: string,
  // editPic: typeof defaultPic,
  // auth: Iauth,
  getPictures: () => Promise<void>,
  setEditPic: (arg0: typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  try {
    const { status } = await axios.request(config);
    if (status === 200) {
      setEditPic(defaultPic);
      await getPictures();
      setShowTable(false);
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}

async function updatePic(
  editPic: typeof defaultPic,
  auth: Iauth,
  getPictures: () => Promise<void>,
  setEditPic: (arg0:typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editPic._id}`;
  const config = {
    url,
    method:'put',
    headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
    data: editPic,
  };
  await performAxiosRequest(config, getPictures, setEditPic, setShowTable);
}

async function deletePic(
  editPic: typeof defaultPic,
  getPictures: () => Promise<void>,
  auth: Iauth,
  setEditPic: (arg0: typeof defaultPic) => void,
  setShowTable: (arg0:boolean)=>void,
): Promise<void> {
  const url = `${process.env.BackendUrl}/book/${editPic._id}`;
  const config = {
    url,
    method:'delete',
    headers: { Authorization: `Bearer ${auth.token}`, Accept: 'application/json' },
  };
  await performAxiosRequest(config, getPictures, setEditPic, setShowTable);
}

export default { makeShowHideCaption, updatePic, deletePic };
