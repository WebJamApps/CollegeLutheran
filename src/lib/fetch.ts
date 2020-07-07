export interface Fetch {
  fetchPost: any;
  fetchGet: any;
}

const fetchGet = async (view:
{
  props: { dispatch: any; };
  superagent: any;
}, route: any, reducer: any) => {
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
    (): any; new(): any;
    set: {
      (arg0: string, arg1: string): {
        (): any; new(): any;
        set: {
          (arg0: string, arg1: string): {
            (): any; new(): any;
            send: { (arg0: any): any; new(): any; };
          }; new(): any;
        };
      }; new(): any;
    };
  };
},
auth: { token: any; }, data: any) {
  return superagent.post(`${process.env.BackendUrl}/book`)
    .set('Authorization', `Bearer ${auth.token}`)
    .set('Content-Type', 'application/json')
    .send(data);
}

export default { fetchGet, fetchPost };
