
const fetch = async (view:
{
  props: { dispatch: any; };
  superagent: {
    get: (arg0: string) => {
      (): any; new(): any;
      set: { (arg0: string, arg1: string): any; new(): any; };
    };
  };
}, route: any, reducer: any) => {
  let res;
  const { dispatch } = view.props;
  try { res = await view.superagent.get(`${process.env.BackendUrl}/${route}`).set('Accept', 'application/json'); } catch (e) {
    if (e.status === 400 && route.includes('homePageContent')) {
      return dispatch({ type: `${reducer}`, data: { title: '', comments: '' } });
    }
    return `${e.message}`;
  }
  dispatch({ type: `${reducer}`, data: res.body });
  return Promise.resolve(true);
};

export default fetch;
