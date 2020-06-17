const fetch = async (view, route, reducer) => {
  let res;
  const { dispatch } = view.props;
  try { res = await view.superagent.get(`${process.env.BackendUrl}/${route}`).set('Accept', 'application/json'); } catch (e) {
    return Promise.resolve(false);
  }
  dispatch({ type: `${reducer}`, data: res.body });
  return Promise.resolve(true);
};

export default fetch;