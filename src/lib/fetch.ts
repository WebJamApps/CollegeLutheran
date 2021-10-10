import type { Dispatch } from 'react';
import type { SuperAgentStatic, SuperAgentRequest } from 'superagent';

const fetchGet = async (view:
{
  props: { dispatch: Dispatch<unknown>; };
  superagent: SuperAgentStatic;
}, route: string, reducer: string): Promise<boolean> => {
  let res;
  const { dispatch } = view.props;
  try {
    res = await view.superagent.get(`${process.env.BackendUrl}/${route}`).set('Accept', 'application/json');
  } catch (e) {
    if (route.includes('PageContent')) {
      dispatch({ type: `${reducer}`, data: { title: '', comments: '' } });
    }
    // eslint-disable-next-line no-console
    console.log(`${(e as Error).message}`);// for Logan to do here!
    return false;
  }
  dispatch({ type: `${reducer}`, data: res.body });
  return true;
};

function fetchPost(superagent: SuperAgentStatic, auth: { token: string; },
  data: { title: string, comments: string, type: string }): SuperAgentRequest {
  return superagent.post(`${process.env.BackendUrl}/book`)
    .set('Authorization', `Bearer ${auth.token}`)
    .set('Content-Type', 'application/json')
    .send(data);
}

export default { fetchGet, fetchPost };
