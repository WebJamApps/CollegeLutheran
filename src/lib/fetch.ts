import { Dispatch } from 'react';

export interface Fetch {
  fetchPost: any;
  fetchGet: any;
}

const fetchGet = async (view:
{
  props: { dispatch: Dispatch<unknown>; };
  superagent: any;
}, route: string, reducer: string): Promise<boolean | string | void> => {
  let res;
  const { dispatch } = view.props;
  try {
    res = await view.superagent.get(`${process.env.BackendUrl}/${route}`).set('Accept', 'application/json');
  } catch (e) {
    if (route.includes('homePageContent')) {
      return dispatch({ type: `${reducer}`, data: { title: '', comments: '' } });
    }
    return `${e.message}`;
  }
  dispatch({ type: `${reducer}`, data: res.body });
  return Promise.resolve(true);
};

function fetchPost(superagent: any, auth: { token: string; }, data: string): any {
  return superagent.post(`${process.env.BackendUrl}/book`)
    .set('Authorization', `Bearer ${auth.token}`)
    .set('Content-Type', 'application/json')
    .send(data);
}

export default { fetchGet, fetchPost };
