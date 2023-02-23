import { Store } from 'react-notifications-component';
import superagent from 'superagent';
import 'react-notifications-component/dist/theme.css';
import type { SuperAgentStatic, SuperAgentRequest } from 'superagent';

const fetchGet = async (view:any,
  route: string, reducer: string,
): Promise<boolean> => {
  let res;
  const { dispatch } = view.props;
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

// function fetchPost(
//   superagent: SuperAgentStatic,
//   auth: { token: string; },
//   data: { title: string, comments: string, type: string },
// ): SuperAgentRequest {
//   return superagent.post(`${process.env.BackendUrl}/book`)
//     .set('Authorization', `Bearer ${auth.token}`)
//     .set('Content-Type', 'application/json')
//     .send(data);
// }

export default {
  fetchGet,
  // fetchPost
};
