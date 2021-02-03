import superagent from 'superagent';
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import fetch from '../../lib/fetch';
import commonUtils from '../../lib/commonUtils';
import type { AdminDashboard, PicData, DashboardProps } from './index';

class AdminController {
  view: AdminDashboard;

  fetch: typeof fetch;

  superagent: superagent.SuperAgentStatic;

  constructor(view: AdminDashboard) {
    this.fetch = fetch;
    this.view = view;
    this.superagent = superagent;
    this.deleteBookApi = this.deleteBookApi.bind(this);
    this.createHomeAPI = this.createHomeAPI.bind(this);
    this.createPicApi = this.createPicApi.bind(this);
    this.addForumAPI = this.addForumAPI.bind(this);
    this.editPicAPI = this.editPicAPI.bind(this);
    this.editor = this.editor.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.addForumButton = this.addForumButton.bind(this);
    this.createBook = this.createBook.bind(this);
    this.addAdminUser = this.addAdminUser.bind(this);
    this.onChangeYouthContent = this.onChangeYouthContent.bind(this);
    this.updateYouthAPI = this.updateYouthAPI.bind(this);
  }

  addForumButton(announcementtitle: string, announcementurl: string): JSX.Element {
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

  addForumForm(): JSX.Element {
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

  changePicDiv(editPic: DashboardProps['editPic'],
    youthName: string, youthURL: string,
    type: string, options: { type: string; Category: string; }[],
    showCaption: string,
    picData: PicData): JSX.Element {
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
          {this.view.forms.makeDropdown('type', 'Category', type, this.view.onChangeSelect, options)}
          {this.view.forms.radioButtons(showCaption, this.view.handleRadioChange)}
          {this.view.picButton(picData, editPic, youthName, youthURL, type)}
        </form>
      </div>
    );
  }

  async deleteBookApi(evt: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string, redirect: string): Promise<boolean> {
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

  validateBook(bookName: string, bookURL: string, type: string, firstEdit: boolean | null): boolean { // eslint-disable-line class-methods-use-this
    let disabled = true;
    if (bookName !== '' && bookURL !== '' && type !== '' && !firstEdit) disabled = false;
    return disabled;
  }

  validateDeleteBook(stateId: string): boolean { // eslint-disable-line class-methods-use-this
    if (stateId !== '') return false;
    return true;
  }

  async createBook(data: { title: string, comments: string, type: string}, redirect: string): Promise<string> {
    const { auth } = this.view.props;
    let r;
    try { r = await this.fetch.fetchPost(this.superagent, auth, data); } catch (e) { return `${e.message}`; }
    if (r.status === 201) {
      window.location.assign(redirect);
      return `${r.status}`;
    }
    return 'Did not create book';
  }

  async updateYouthAPI(evt: { preventDefault: () => void; }): Promise<string> {
    evt.preventDefault();
    const { auth } = this.view.props;
    const { youthTitle, youthContent } = this.view.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/one?type=youthPageContent`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title: youthTitle, comments: youthContent, type: 'youthPageContent' });
    } catch (e) { return `${e.message}`; }
    if (r.status === 200) {
      window.location.assign('/youth');
      return `${r.status}`;
    }
    return 'Failed to update youth page.';
  }

  async createHomeAPI(evt: { preventDefault: () => void; }): Promise<string> {
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
      return `${r.status}`;
    }
    return 'Failed to create.';
  }

  createPicApi(evt: { preventDefault: () => void; }, data: {title: string, comments: string, type: string}, redirect: string): Promise<string> {
    evt.preventDefault();
    return this.createBook(data, redirect);
  }

  async addForumAPI(): Promise<boolean> {
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

  async editPicAPI(evt: { preventDefault: () => void; }): Promise<boolean> {
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
        youthName: '', youthURL: '', type: '',
      });
      window.location.reload();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  onChangeYouthContent(youthContent: string): string { this.view.setState({ youthContent }); return youthContent; }

  handleEditorChange(homePageContent: string): string { this.view.setState({ homePageContent }); return homePageContent; }

  editor(pageContent: string | undefined, onChange?: (arg0: string) => string): JSX.Element {
    let changeFunc = onChange;
    if (!changeFunc) changeFunc = this.handleEditorChange;
    return (
      <Editor
        apiKey={process.env.TINY_KEY}
        initialValue={pageContent}
        init={{
          height: 500,
          menubar: 'insert tools',
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
        onEditorChange={changeFunc}
      />
    );
  }

  adminUserForm(): JSX.Element {
    const { formError } = this.view.state;
    return (
      <div
        className="material-content elevation3"
        style={{ maxWidth: '320px', margin: '30px auto', padding: '10px 10px 20px 10px' }}
      >
        <h4 className="material-header-h4">
          Add Admin User
        </h4>
        <form
          id="modify-admins"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          <label htmlFor="addAdminEmail">
            Admin Email
            <input
              id="addAdminEmail"
              type="email"
              placeholder="placeholder@gmail.com"
              onChange={this.view.onChangeAdminEmail}
            />
          </label>
          <input type="submit" disabled={this.validateAdmin()} onClick={this.addAdminUser} />
          <p className="form-errors" style={{ color: 'red', marginBottom: '-15px' }}>{formError}</p>
        </form>
      </div>
    );
  }

  validateAdmin(): boolean { // eslint-disable-line class-methods-use-this
    let disabled = true,
      validEmail = false;
    const { addAdminEmail, formError } = this.view.state;
    // eslint-disable-next-line no-useless-escape
    const regEx = RegExp('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$');
    if (regEx.test(addAdminEmail) && addAdminEmail.includes('.') && addAdminEmail.includes('@gmail.com')) {
      validEmail = true;
    }
    if (addAdminEmail !== '' && validEmail && !formError.includes('gmail')) disabled = false;
    return disabled;
  }

  async addAdminUser(evt: { preventDefault: () => void; }): Promise<boolean | void> {
    evt.preventDefault();
    const { addAdminEmail } = this.view.state;
    const userRoles: string[] = commonUtils.getUserRoles();
    const { auth } = this.view.props;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/user`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({
          email: addAdminEmail,
        });
    // eslint-disable-next-line no-console
    } catch (e) { console.log(e); return false; }// TODO not console log error, but display error on page
    if (r.status === 400) {
      this.view.setState({ formError: '' });
      return true;
    }
    if (r.body._id && userRoles.indexOf(r.body.userType) === -1) {
      return true;
    }
    this.view.setState({ formError: 'User already an admin', addAdminEmail: '' });
    return false;
  }
}
export default AdminController;
