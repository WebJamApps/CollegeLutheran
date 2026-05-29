import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { Dispatch, AnyAction } from 'redux';

const fetchGet = async (dispatch:Dispatch<AnyAction>,
  route: string, reducer: string,
): Promise<boolean> => {
  let body;
  try {
    const res = await fetch(`${process.env.BackendUrl}/${route}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    body = await res.json();
  } catch (e) {
    if (route.includes('PageContent')) {
      dispatch({ type: `${reducer}`, data: { title: '', comments: '' } });
    }
    toast.warning(`${reducer}: Message Failed to Get the Information`, { position: 'top-right', autoClose: 5000 });
    // eslint-disable-next-line no-console
    console.log((e as Error).message);
    return false;
  }
  dispatch({ type: `${reducer}`, data: body });
  return true;
};

export default {
  fetchGet,
};
