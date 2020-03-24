import superagent from 'superagent';
import React from 'react';

class AdminController {
  constructor(view) {
    this.view = view;
    this.superagent = superagent;
    this.deleteBookApi = this.deleteBookApi.bind(this);
    this.createHomeAPI = this.createHomeAPI.bind(this);
    this.createPicApi = this.createPicApi.bind(this);
    this.addForumAPI = this.addForumAPI.bind(this);
    this.deletebookForm = this.deleteBookForm.bind(this);
  }

  async deleteBookApi(evt, id, redirect) {
    evt.preventDefault();// eslint-disable-next-line no-restricted-globals
    const result = confirm('Deleting Announcment, are you sure?');// eslint-disable-line no-alert
    if (result) {
      const { auth } = this.view.props;
      let r;
      try {
        r = await this.superagent.delete(`${process.env.BackendUrl}/book/${id}`).set('Authorization', `Bearer ${auth.token}`)
          .set('Accept', 'application/json');
      } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
      if (r.status === 200) {
        window.location.assign(`${redirect}`);
        return Promise.resolve(true);
      } console.log(r.body); // eslint-disable-line no-console
      return Promise.resolve(false);
    }
    return Promise.resolve(false);
  }

  validateBook(bookName, bookURL, type) { // eslint-disable-line class-methods-use-this
    if (bookName !== '' && bookURL !== '' && type !== '') return false;
    return true;
  }

  validateDeleteBook(stateId) { // eslint-disable-line class-methods-use-this
    if (stateId !== '') return false;
    return true;
  }

  async createHomeAPI(evt) {
    evt.preventDefault();
    const { auth } = this.view.props;
    const { title, homePageContent } = this.view.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/one?type=homePageContent`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title, comments: homePageContent, type: 'homePageContent' });
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 200) {
      window.location.assign('/');
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }

  async createPicApi(evt, body, redirect) {
    evt.preventDefault();
    let r;
    const { auth } = this.view.props;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`)
        .set('Content-Type', 'application/json')
        .send(body);
    } catch (e) { return Promise.resolve(false); }
    if (r.status === 201) {
      window.location.assign(redirect);
      return Promise.resolve(true);
    } return Promise.resolve(false);
  }

  async addForumAPI() {
    const { auth } = this.view.props;
    const { announcementtitle, announcementurl } = this.view.state;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({
          title: announcementtitle,
          url: announcementurl,
          comments: announcementurl,
          type: 'Forum',
          access: 'CLC',
        });
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 201) {
      window.location.assign('/news');
      return Promise.resolve(true);
    } console.log(r.body); return Promise.resolve(false);// eslint-disable-line no-console
  }

  deleteBookForm(bookId, labelTxt, stateId, propsArr, redirect) {
    return (
      <form
        id="delete-book"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        { this.view.forms.makeDropdown(bookId, `* Select ${labelTxt} to Delete`, stateId, this.view.onChange, propsArr, '_id', 'title') }
        <div style={{ marginLeft: '60%' }}>
          <p>{' '}</p>
          <button
            onClick={(evt) => this.deleteBookApi(evt, stateId, redirect)}
            type="button"
            disabled={this.validateDeleteBook(stateId)}
          >
            Delete
            {' '}
            {labelTxt}
          </button>
        </div>
      </form>
    );
  }
}

export default AdminController;
