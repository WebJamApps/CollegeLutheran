import { Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
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
    Store.addNotification({
      title: `${reducer}`,
      message: 'Message Failed to Get the Information',
      type: 'warning',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated animate__fadeIn'],
      animationOut: ['animate__animated animate__fadeOut'],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
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
