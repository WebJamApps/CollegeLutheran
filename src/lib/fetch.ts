import { Dispatch } from 'react';

export interface Fetch {
  fetchPost: any;
  fetchGet: any;
}

const fetchGet = async (view:
{
  props: { dispatch: Dispatch<unknown>; };
  superagent: any;
}, route: any, reducer: any): Promise<any> => {
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

function fetchPost(superagent:
{
  post: (arg0: string) => {
    (): string; new(): string;
    set: {
      (arg0: string, arg1: string): {
        (): string; new(): string;
        set: {
          (arg0: string, arg1: string): {
            (): string; new(): string;
            send: { (arg0: string): string; new(): string; };
          }; new(): string;
        };
      }; new(): string;
    };
  };
},
auth: { token: any; }, data: any): any {
  return superagent.post(`${process.env.BackendUrl}/book`)
    .set('Authorization', `Bearer ${auth.token}`)
    .set('Content-Type', 'application/json')
    .send(data);
}

export default { fetchGet, fetchPost };
