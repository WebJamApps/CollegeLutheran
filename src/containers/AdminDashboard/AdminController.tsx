import superagent from 'superagent';
import React from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { Editor } from '@tinymce/tinymce-react';
import type { InputParams } from '../../lib/forms';
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
    this.createPicApi = this.createPicApi.bind(this);
    this.addForumAPI = this.addForumAPI.bind(this);
    this.editPicAPI = this.editPicAPI.bind(this);
    this.editor = this.editor.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.createBook = this.createBook.bind(this);
    this.addAdminUser = this.addAdminUser.bind(this);
    this.onChangeYouthContent = this.onChangeYouthContent.bind(this);
    this.putAPI = this.putAPI.bind(this);
    this.warnNotif = this.warnNotif.bind(this);
    this.addForumButton = this.addForumButton.bind(this);
  }
  
  warnNotif(id: string, message: string): void{
    store.addNotification({
      title: id,
      message: message,
      type: 'warning',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated animate__fadeIn'],
      animationOut: ['animate__animated animate__fadeOut'],
      dismiss: { duration: 5000, onScreen: true, 
      }, 
    });
  }

  addForumButton(announcementtitle: string, announcementurl: string): JSX.Element {
    return (
      <div style={{ marginLeft: '70%', marginTop: '10px' }}>
        <button type="button"
          id="addForum"
          disabled={this.validateBook(announcementtitle, announcementurl, 'Forum', null)}
          onClick={this.addForumAPI}
        >
          Add
        </button>
      </div>
    );
  }

  createNews(inputParams: InputParams, ip2: InputParams, isworshipbulletin: string, newstitle: string, newsurl: string):JSX.Element {
    return (
      <form id="create-forum" style={{ textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%', 
      }}
      >
        {this.view.forms.makeInput(inputParams)}
        {this.view.forms.makeInput(ip2)}
        {this.view.forms.makeInput({
          newLine: false,
          width: '10%',
          type: 'checkbox',
          label: 'Is Worship Bulletin',
          isRequired: false,
          onChange: this.view.onChangeAddForum,
          value: isworshipbulletin === '' ? 'worshipbulletin' : '',
        })}
        {this.addForumButton(newstitle, newsurl)}
      </form>
    );
  }

  addForumForm(): JSX.Element {
    const { newstitle, newsurl, forumId, isworshipbulletin, 
    } = this.view.state;
    const { books } = this.view.props;
    const inputParams = {
      type: 'text',
      label: 'News Title',
      isRequired: false,
      onChange: this.view.onChangeAddForum,
      value: newstitle,
      width: '90%',
    };
    const ip2 = { ...inputParams, label: 'News URL', value: newsurl };
    return (
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: '30px auto auto auto' }}>
        <h5>News Table</h5>
        {this.createNews(inputParams, ip2, isworshipbulletin, newstitle, newsurl)}
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
      <div className="material-content elevation3" style={{ maxWidth: '320px', margin: '30px auto' }}
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
      } catch (e) {
        this.warnNotif(id, 'Error Could Not Delete Book');
        return Promise.resolve(false);
      }
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

  async createBook(data: { title: string, comments: string, type: string }, redirect: string): Promise<string> {
    const { auth } = this.view.props;
    let r;
    try { r = await this.fetch.fetchPost(this.superagent, auth, data); } catch (e) { return `${(e as Error).message}`; }
    if (r.status === 201) {
      this.warnNotif(data.title, 'Error Could Not Update');
      window.location.assign(redirect);
      return `${r.status}`;
    }
    return 'Did not create book';
  }

  async putAPI(evt: { preventDefault: () => void; }, body:{ title:string;comments:string;type:string }, redirect:string):Promise<string> {
    const { auth } = this.view.props;
    evt.preventDefault();
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/one?type=${body.type}`)
        .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
        .send(body);
    } catch (e) {
      this.warnNotif(body.title, 'Error Could Not Update');
      return `${(e as Error).message}`;
    }
    if (r.status === 200) {
      window.location.assign(redirect);
      return `${r.status}`;
    }
    return `Failed to update ${redirect} page.`;
  }

  async createPicApi(evt: { preventDefault: () => void; }, data: { title: string,
    comments: string, type: string }, redirect: string): Promise<string> {
    evt.preventDefault();
    return this.createBook(data, redirect);
  }

  async addForumAPI(): Promise<boolean> {
    const { auth } = this.view.props;
    const { newstitle, newsurl, isworshipbulletin } = this.view.state;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title: newstitle,
          url: newsurl,
          comments: isworshipbulletin,
          type: 'Forum',
          access: 'CLC',
        });
    } catch (e) { 
      this.warnNotif(newstitle, 'Failed To Update News');
      return Promise.resolve(false); 
    }
    if (r.status === 201) {
      window.location.assign('/news');
      return Promise.resolve(true);
    } return Promise.resolve(false);
  }

  async editPicAPI(evt: { preventDefault: () => void; }): Promise<boolean> {
    evt.preventDefault();
    const { auth, editPic, dispatch } = this.view.props;
    const { youthName, youthURL, type, showCaption,
    } = this.view.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/${editPic._id}`)
        .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
        .send({ title: youthName, url: youthURL, type, comments: showCaption,
        });
    } catch (e) { 
      this.warnNotif(editPic.title, 'Failed to edit Pic'); return Promise.resolve(false);
    }
    if (r.status === 200) {
      dispatch({ type: 'EDIT_PIC', picData: {} });
      dispatch({ type: 'SHOW_TABLE', showTable: true });
      this.view.setState({ youthName: '', youthURL: '', type: '',
      });
      window.location.reload();
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  }

  onChangeYouthContent(youthContent: string): string {
    this.view.setState({ youthContent }); return youthContent;
  }

  handleEditorChange(homePageContent: string): string { this.view.setState({ homePageContent }); return homePageContent; }

  editor(pageContent: string | undefined, onChange?: (arg0: string) => string): JSX.Element {
    let changeFunc = onChange;
    if (!changeFunc) changeFunc = this.handleEditorChange;
    return (
      <Editor
        apiKey={process.env.TINY_KEY}
        value={pageContent}
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
        .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json')
        .send({ email: addAdminEmail,
        });
    // eslint-disable-next-line no-console
    } catch (e) { this.warnNotif(addAdminEmail, 'Failed to Create the Admin User'); console.log(e); return false; }
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
