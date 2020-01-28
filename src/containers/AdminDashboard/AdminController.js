class AdminController {
  constructor(view) {
    this.view = view;
    this.deleteForum = this.deleteForum.bind(this);
    this.deleteYouth = this.deleteYouth.bind(this);
  }

  async deleteForum() {
    const { auth } = this.view.props;
    const { forumId } = this.view.state;
    let r;
    try {
      r = await this.view.superagent.delete(`${process.env.BackendUrl}/book/${forumId}`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json');
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 200) {
      window.location.assign('/news');
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }

  async deleteYouth() {
    const { auth } = this.view.props;
    const { youthPicsId } = this.view.state;
    let r;
    try {
      r = await this.view.superagent.delete(`${process.env.BackendUrl}/book/${youthPicsId}`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json');
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 200) {
      window.location.assign('/youth');
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }
}

export default AdminController;
