import React, { Component, Dispatch } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import Forms from '../../lib/forms';
import AdminController from './AdminController';
import CommonUtils from '../../lib/commonUtils';
import PTable from '../../components/PhotoTable';
import YouthPageEditor from '../../components/YouthPageEditor';
import AdminUserForm from '../../components/AdminUserForm';

export interface PicData {
  buttonId: string; buttonClick: (e: React.ChangeEvent<EventTarget>) => Promise<string>; title: string; nameId: string;
}
export interface DashboardProps extends RouteComponentProps {
  dispatch: Dispatch<unknown>;
  homeContent: Ibook;
  auth: { token: string };
  books: Record<string, string>[];
  showTable: boolean;
  editPic: Ibook;
  youthPics: Ibook[];
  familyPics: Ibook[];
  otherPics: Ibook[];
  musicPics: Ibook[];
  //habitatPics: Ibook[]
  youthContent: Ibook;
}
type DashboardState = {
  type: string;
  title: string;
  homePageContent: string;
  newstitle: string;
  newsurl: string;
  youthName: string;
  youthURL: string;
  forumId: string;
  showCaption: string;
  firstEdit: boolean;
  addAdminEmail: string;
  formError: string;
  youthTitle: string;
  youthContent: string;
  isworshipbulletin: string;
};
export class AdminDashboard extends Component<DashboardProps, DashboardState> {
  commonUtils = CommonUtils;

  controller: AdminController;

  forms = Forms;

  constructor(props: DashboardProps) {
    super(props);
    this.controller = new AdminController(this);
    this.state = {
      isworshipbulletin: '',
      type: '',
      title: props.homeContent.title || '',
      homePageContent: props.homeContent.comments || '',
      newstitle: '',
      newsurl: '',
      youthName: '',
      youthURL: '',
      forumId: '',
      showCaption: '',
      firstEdit: true,
      addAdminEmail: '',
      formError: '',
      youthTitle: props.youthContent.title || '',
      youthContent: props.youthContent.comments || '',
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeAddForum = this.onChangeAddForum.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.checkEdit = this.checkEdit.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
    this.changePicForm = this.changePicForm.bind(this);
    this.deleteForumForm = this.deleteForumForm.bind(this);
    this.picButton = this.picButton.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.resetEditForm = this.resetEditForm.bind(this);
    this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
  }

  componentDidMount(): void { this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width); }

  handleRadioChange(evt: { target: { value: string } }): void {
    this.checkEdit();
    this.setState({ showCaption: evt.target.value });
  }

  onChange(evt: React.ChangeEvent<HTMLInputElement>, stateValue?: string): string {
    evt.persist();
    this.checkEdit();
    if (typeof stateValue === 'string') {
      this.setState((prevState) => ({ ...prevState, [stateValue]: evt.target.value, firstEdit: false }));
      return stateValue;
    }
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, firstEdit: false }));
    return evt.target.id;
  }

  onChangeAddForum(evt: React.ChangeEvent<HTMLInputElement>): string {
    evt.persist();
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value }));
    return evt.target.id;
  }

  onChangeAdminEmail(evt: React.ChangeEvent<HTMLInputElement>): string {
    evt.persist();
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, formError: '' }));
    return evt.target.id;
  }

  onChangeSelect(evt: React.ChangeEvent<HTMLSelectElement>, stateValue?: string): string {
    evt.persist();
    this.checkEdit();
    if (typeof stateValue === 'string') {
      this.setState((prevState) => ({ ...prevState, [stateValue]: evt.target.value }));
      return stateValue;
    }
    this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value }));
    return evt.target.id;
  }

  checkEdit(): void {
    let {
      youthName, youthURL, type, showCaption,
    } = this.state;
    const { editPic } = this.props;
    if (youthName === '' && editPic.title !== undefined) youthName = editPic.title;
    if (youthURL === '' && editPic.url !== undefined) youthURL = editPic.url;
    if (type === '' && editPic.type !== undefined) type = editPic.type;
    if (showCaption === '' && editPic.comments !== undefined) showCaption = editPic.comments;
    this.setState({
      youthName, youthURL, type, showCaption,
    });
  }

  resetEditForm(evt: React.MouseEvent<HTMLButtonElement>): void {
    evt.preventDefault();
    const { dispatch } = this.props;
    dispatch({ type: 'EDIT_PIC', picData: {} });
    dispatch({ type: 'SHOW_TABLE', showTable: true });
    this.setState({
      youthName: '', youthURL: '', type: '', showCaption: '', firstEdit: true,
    });
  }

  picButton(picData: PicData,
    editPic: { _id: string }, youthName: string, youthURL: string, type: string): JSX.Element {
    const { firstEdit } = this.state;
    return (
      <div style={{ marginLeft: '50%', marginTop: '10px' }}>
        {editPic._id ? (
          <button
            style={{ display: 'relative', marginRight: '20px' }}
            type="button"
            id="cancel-edit-pic"
            onClick={this.resetEditForm}
          >
            Cancel
          </button>
        ) : null}
        <button
          style={{ display: 'relative' }}
          disabled={this.controller.validateBook(youthName, youthURL, type, firstEdit)}
          type="button"
          id={picData.buttonId}
          onClick={
            editPic._id ? this.controller.editPicAPI : picData.buttonClick
          }
        >
          {editPic._id ? 'Edit ' : 'Add '}
          Pic
        </button>
      </div>
    );
  }

  changePicForm(picData: PicData): JSX.Element['props'] {
    const options = [
      { type: 'youthPics', Category: 'Youth Pics' },
      { type: 'familyPics', Category: 'Family Pics' },
      { type: 'otherPics', Category: 'Other Pics' },
      { type: 'musicPics', Category: 'Music Pics' },
      { type: 'habitat', Category: 'Habitat' },
    ];
    const { youthURL, youthName } = this.state;
    let { type, showCaption } = this.state;
    const { editPic } = this.props;
    if (type === '' && editPic.type !== undefined) type = editPic.type;
    if (showCaption === '' && editPic.comments !== undefined) showCaption = editPic.comments;
    return this.controller.changePicDiv(editPic, youthName, youthURL, type, options, showCaption, picData);
  }

  deleteForumForm(forumId: string, options: Record<string, string>[]): JSX.Element {
    const ddParams = {
      htmlFor: 'forumId',
      labelText: '* Select Title to Delete',
      value: forumId,
      onChange: this.onChangeSelect,
      options,
      oValue: '_id',
      dValue: 'title',
    };
    return (
      <form
        id="delete-forum"
        style={{
          textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '100%',
        }}
      >
        {this.forms.makeDataDropdown(ddParams)}
        <p> </p>
        <button
          onClick={(evt) => this.controller.deleteBookApi(evt, forumId, '/news')}
          type="button"
          disabled={this.controller.validateDeleteBook(forumId)}
        >
          Delete
        </button>
      </form>
    );
  }

  updateHomeButton(title:string, homePageContent:string):JSX.Element {
    return (
      <div style={{ marginLeft: '60%', marginTop: '10px' }}>
        <button
          type="button"
          id="c-h"
          disabled={false}
          onClick={(evt) => this.controller.putAPI(evt, { title, comments: homePageContent, type: 'homePageContent' }, '/')}
        >
          Update Homepage
        </button>
      </div>
    );
  }

  changeHomepage(): JSX.Element {
    const { title, homePageContent } = this.state;
    const inputParams = {
      type: 'text', label: 'Title', isRequired: false, onChange: this.onChange, value: title, width: '90%',
    };
    return (
      <div className="horiz-scroll">
        <div className="material-content elevation3" style={{ width: '850px', margin: '30px auto' }}>
          <h5>Change Homepage Section</h5>
          <form
            id="create-homepage"
            style={{
              textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
            }}
          >
            {this.forms.makeInput(inputParams)}
            <label htmlFor="content">
              Content
              <br />
              {this.controller.editor(homePageContent)}
            </label>
            {this.updateHomeButton(title, homePageContent)}
          </form>
        </div>
      </div>
    );
  }

  changeYouthForm(): string {
    const {
      youthName, youthURL, type, showCaption,
    } = this.state;
    const postBody = {
      title: youthName,
      url: youthURL,
      comments: showCaption,
      type,
      access: 'CLC',
    };
    return this.changePicForm({
      buttonId: 'addYouthPic',
      buttonClick: (e: React.ChangeEvent<EventTarget>) => this.controller.createPicApi(e, postBody, '/admin'),
      title: '',
      nameId: 'youthName',
    });
  }

  render(): JSX.Element {
    const {
      showTable, auth, dispatch, youthPics, familyPics, otherPics, musicPics,
    } = this.props;
    const { youthTitle, youthContent } = this.state;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
        {this.changeHomepage()}
        {this.controller.addForumForm()}
        {this.changeYouthForm()}
        {showTable ? (
          <PTable auth={auth} dispatch={dispatch} youthPics={youthPics} familyPics={familyPics} otherPics={otherPics} musicPics={musicPics} />
        ) : null}
        <YouthPageEditor comp={this} youthContent={youthContent} youthTitle={youthTitle} makeInput={this.forms.makeInput} />
        <AdminUserForm comp={this} />
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps, null)(AdminDashboard));
