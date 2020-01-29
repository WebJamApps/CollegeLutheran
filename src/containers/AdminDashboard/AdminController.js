class AdminController {
  constructor(view) {
    this.view = view;
    this.deleteBookApi = this.deleteBookApi.bind(this);
  }

  async deleteBookApi(evt, id, redirect) {
    evt.preventDefault();
    const { auth } = this.view.props;
    let r;
    try {
      r = await this.view.superagent.delete(`${process.env.BackendUrl}/book/${id}`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json');
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 200) {
      window.location.assign(`${redirect}`);
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }
}

export default AdminController;
