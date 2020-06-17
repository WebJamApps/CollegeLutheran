import superagent from 'superagent';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class AdminController {
  view: any;

  superagent: superagent.SuperAgentStatic;

  deletebookForm: (bookId: any, labelTxt: any, stateId: any, propsArr: any, redirect: any) => JSX.Element;

  constructor(view) {
    this.view = view;
    this.superagent = superagent;
    this.deleteBookApi = this.deleteBookApi.bind(this);
    this.createHomeAPI = this.createHomeAPI.bind(this);
    this.createPicApi = this.createPicApi.bind(this);
    this.addForumAPI = this.addForumAPI.bind(this);
    this.deletebookForm = this.deleteBookForm.bind(this);
    this.editPicAPI = this.editPicAPI.bind(this);
    this.editor = this.editor.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  addForumForm() {
    const { announcementtitle, announcementurl, forumId } = this.view.state;
    const { books } = this.view.props;
    return (
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '30px auto auto auto' }}>
        <h5>Announcements Table</h5>
        <form
          id="create-forum"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {this.view.forms.makeInput('text', 'Announcement Title', false, this.view.onChange, announcementtitle, '90%')}
          {this.view.forms.makeInput('text', 'Announcement URL', false, this.view.onChange, announcementurl, '90%')}
          <div style={{ marginLeft: '70%', marginTop: '10px' }}>
            <button
              type="button"
              id="addForum"
              disabled={this.validateBook(announcementtitle, announcementurl, 'Forum', null)}
              onClick={this.addForumAPI}
            >
              Add
            </button>
          </div>
        </form>
        <hr />
        {this.view.deleteForumForm(forumId, books)}
      </div>
    );
  }

  changePicDiv(editPic, youthName, youthURL, type, options, showCaption, picData) {
    return (
      <div
        className="material-content elevation3"
        style={{ maxWidth: '320px', margin: '30px auto' }}
      >
        <h4 className="material-header-h4">
          {editPic._id ? 'Edit ' : 'Add '}
          Pictures
        </h4>
        <form id="picsForm">
          <label htmlFor="youthName">
            Picture Title
            <input id="youthName" placeholder={editPic.title} value={youthName} onChange={this.view.onChange} />
          </label>
          <label htmlFor="youthURL">
            Image Address
            <input id="youthURL" placeholder={editPic.url} value={youthURL} onChange={this.view.onChange} />
          </label>
          {this.view.forms.makeDropdown('type', 'Category', type, this.view.onChange, options)}
          {this.view.forms.radioButtons(showCaption, this.view.handleRadioChange)}
          {this.view.picButton(picData, editPic, youthName, youthURL, type)}
        </form>
      </div>
    );
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

  validateBook(bookName, bookURL, type, firstEdit) { // eslint-disable-line class-methods-use-this
    let disabled = true;
    if (bookName !== '' && bookURL !== '' && type !== '' && !firstEdit) disabled = false;
    return disabled;
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
          comments: '',
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

  async editPicAPI(evt) {
    evt.preventDefault();
    const { auth, editPic, dispatch } = this.view.props;
    const {
      youthName, youthURL, type, showCaption,
    } = this.view.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/${editPic._id}`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({
          title: youthName, url: youthURL, type, comments: showCaption,
        });
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 200) {
      dispatch({ type: 'EDIT_PIC', picData: {} });
      dispatch({ type: 'SHOW_TABLE', showTable: true });
      this.view.setState({
        isEdit: false, youthName: '', youthURL: '', type: '',
      });
      window.location.reload();
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }

  handleEditorChange(homePageContent) { this.view.setState({ homePageContent }); return true; }

  editor(homePageContent) {
    return (
      <Editor
        apiKey={process.env.TINY_KEY}
        initialValue={homePageContent}
        init={{
          height: 500,
          menubar: 'insert tools',
          selector: 'textarea',
          menu: { format: { title: 'Format', items: 'forecolor backcolor' } },
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
          'undo redo | formatselect | bold italic backcolor forecolor |'
          + 'alignleft aligncenter alignright alignjustify |'
          + 'bullist numlist outdent indent | removeformat | help',
        }}
        onEditorChange={this.handleEditorChange}
      />
    );
  }
}
export default AdminController;
