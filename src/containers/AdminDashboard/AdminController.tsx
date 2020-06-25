import superagent from 'superagent';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import fetch from '../../lib/fetch';

class AdminController {
  view: any;

  fetch: any;

  superagent: superagent.SuperAgentStatic;

  deletebookForm: (bookId: any, labelTxt: any, stateId: any, propsArr: any, redirect: any) => JSX.Element;

  constructor(view: any) {
    this.fetch = fetch;
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
    this.addForumButton = this.addForumButton.bind(this);
    this.createBook = this.createBook.bind(this);
  }

  addForumButton(announcementtitle: string, announcementurl: string) {
    return (
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
    );
  }

  addForumForm() {
    const { announcementtitle, announcementurl, forumId } = this.view.state;
    const { books } = this.view.props;
    const inputParams = {
      type: 'text',
      label: 'Announcement Title',
      isRequired: false,
      onChange: this.view.onChange,
      value: announcementtitle,
      width: '90%',
    };
    const ip2 = { ...inputParams, label: 'Announcement URL', value: announcementurl };
    return (
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '30px auto auto auto' }}>
        <h5>Announcements Table</h5>
        <form
          id="create-forum"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {this.view.forms.makeInput(inputParams)}
          {this.view.forms.makeInput(ip2)}
          {this.addForumButton(announcementtitle, announcementurl)}
        </form>
        <hr />
        {this.view.deleteForumForm(forumId, books)}
      </div>
    );
  }

  changePicDiv(editPic: any,
    youthName: string | number | readonly string[] | undefined, youthURL: string | number | readonly string[] | undefined,
    type: string, options: { type: string; Category: string; }[],
    showCaption: string,
    picData: { buttonId: string; buttonClick: (e: any) => Promise<boolean|string>; title: string; nameId: string; }) {
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

  async deleteBookApi(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: any, redirect: string) {
    evt.preventDefault();// eslint-disable-next-line no-restricted-globals
    const result = confirm('Deleting Announcment, are you sure?');// eslint-disable-line no-alert
    if (result) {
      const { auth } = this.view.props;
      let r;
      try {
        r = await this.superagent.delete(`${process.env.BackendUrl}/book/${id}`).set('Authorization', `Bearer ${auth.token}`)
          .set('Accept', 'application/json');
      } catch (e) { return Promise.resolve(false); }
      if (r.status === 200) {
        window.location.assign(`${redirect}`);
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    }
    return Promise.resolve(false);
  }

  validateBook(bookName: string, bookURL: string, type: string, firstEdit: boolean | null) { // eslint-disable-line class-methods-use-this
    let disabled = true;
    if (bookName !== '' && bookURL !== '' && type !== '' && !firstEdit) disabled = false;
    return disabled;
  }

  validateDeleteBook(stateId: string) { // eslint-disable-line class-methods-use-this
    if (stateId !== '') return false;
    return true;
  }

  async createBook(data: any, redirect: string) {
    const { auth } = this.view.props;
    let r;
    try { r = await this.fetch.fetchPost(this.superagent, auth, data); } catch (e) { return `${e.message}`; }
    if (r.status === 201) {
      window.location.assign(redirect);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  async createHomeAPI(evt: { preventDefault: () => void; }) {
    evt.preventDefault();
    const { auth } = this.view.props;
    const { title, homePageContent } = this.view.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/one?type=homePageContent`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title, comments: homePageContent, type: 'homePageContent' });
    } catch (e) {
      return this.createBook({ title, comments: homePageContent, type: 'homePageContent' }, '/');
    }
    if (r.status === 200) {
      window.location.assign('/');
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  createPicApi(evt: { preventDefault: () => void; }, data: any, redirect: string) {
    evt.preventDefault();
    return this.createBook(data, redirect);
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
    } catch (e) { return Promise.resolve(false); }
    if (r.status === 201) {
      window.location.assign('/news');
      return Promise.resolve(true);
    } return Promise.resolve(false);
  }

  deleteBookForm(bookId: any, labelTxt: React.ReactNode, stateId: any, propsArr: any, redirect: any) {
    return (
      <form
        id="delete-book"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        {this.view.forms.makeDropdown(bookId, `* Select ${labelTxt} to Delete`, stateId, this.view.onChange, propsArr, '_id', 'title')}
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

  async editPicAPI(evt: { preventDefault: () => void; }) {
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
    } catch (e) { return Promise.resolve(false); }
    if (r.status === 200) {
      dispatch({ type: 'EDIT_PIC', picData: {} });
      dispatch({ type: 'SHOW_TABLE', showTable: true });
      this.view.setState({
        isEdit: false, youthName: '', youthURL: '', type: '',
      });
      window.location.reload();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  handleEditorChange(homePageContent: any) { this.view.setState({ homePageContent }); return true; }

  editor(homePageContent: string | undefined) {
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
