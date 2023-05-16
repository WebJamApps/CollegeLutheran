import { Store } from 'react-notifications-component';
import superagent from 'superagent';
import 'react-notifications-component/dist/theme.css';
import type { Dispatch, AnyAction } from 'redux';

const fetchGet = async (dispatch:Dispatch<AnyAction>,
  route: string, reducer: string,
): Promise<boolean> => {
  let res;
  try {
    res = await superagent.get(`${process.env.BackendUrl}/${route}`).set('Accept', 'application/json');
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
  dispatch({ type: `${reducer}`, data: res.body });
  return true;
};

export default {
  fetchGet,
};
