/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component, ChangeEvent } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';
import AdminController from './AdminController';
import commonUtils from '../../lib/commonUtils';
import PTable from '../../components/PhotoTable';

interface DashboardProps extends RouteComponentProps<any> {
  dispatch: (...args: any) => any;
  homeContent: { title: string; comments: string };
  auth: { token: string };
  books: any[];
  showTable: boolean;
  editPic: {
    _id: string;
    type: string;
    title: string;
    url: string;
    comments: string;
  };
}
type DashboardState = {
  type: string;
  title: string;
  homePageContent: string;
  announcementtitle: string;
  announcementurl: string;
  youthName: string;
  youthURL: string;
  forumId: string;
  showCaption: string;
  firstEdit: boolean;
};
export class AdminDashboard extends Component<DashboardProps, DashboardState> {
  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>;
    delay: (ms: any) => Promise<unknown>;
  };

  controller: AdminController;

  forms:any;

  constructor(props: DashboardProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.controller = new AdminController(this);
    this.state = {
      type: '',
      title: props.homeContent.title,
      homePageContent: props.homeContent.comments,
      announcementtitle: '',
      announcementurl: '',
      youthName: '',
      youthURL: '',
      forumId: '',
      showCaption: '',
      firstEdit: true,
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.checkEdit = this.checkEdit.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
    this.addForumForm = this.addForumForm.bind(this);
    this.changePicForm = this.changePicForm.bind(this);
    this.deleteForumForm = this.deleteForumForm.bind(this);
    this.picButton = this.picButton.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this.resetEditForm = this.resetEditForm.bind(this);
  }

  componentDidMount() {
    this.commonUtils.setTitleAndScroll('Admin Dashboard', window.screen.width);
  }

  onChange(evt: ChangeEvent, stateValue: any): void {
    this.checkEdit();
    if (typeof stateValue === 'string') {
      this.setState((prevState) => ({ ...prevState, [stateValue]: evt.target.value, firstEdit: false }));
    } else {
      this.setState((prevState) => ({ ...prevState, [evt.target.id]: evt.target.value, firstEdit: false }));
    }
  }

  checkEdit() {
    let {
      youthName, youthURL, type, showCaption,
    } = this.state;
    const { editPic } = this.props;
    if (youthName === '' && editPic.title !== undefined) {
      youthName = editPic.title;
    }
    if (youthURL === '' && editPic.url !== undefined) {
      youthURL = editPic.url;
    }
    if (type === '' && editPic.type !== undefined) {
      type = editPic.type;
    }
    if (showCaption === '' && editPic.comments !== undefined) {
      showCaption = editPic.comments;
    }
    this.setState({
      youthName,
      youthURL,
      type,
      showCaption,
    });
  }

  resetEditForm(evt) {
    evt.preventDefault();
    const { dispatch } = this.props;
    dispatch({ type: 'EDIT_PIC', picData: {} });
    dispatch({ type: 'SHOW_TABLE', showTable: true });
    this.setState({
      youthName: '',
      youthURL: '',
      type: '',
      showCaption: '',
      firstEdit: true,
    });
  }

  picButton(picData, editPic, youthName, youthURL, type) {
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
          disabled={this.controller.validateBook(
            youthName,
            youthURL,
            type,
            firstEdit,
          )}
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

  handleRadioChange(evt: {target: {value:string}}) {
    this.checkEdit();
    this.setState({ showCaption: evt.target.value });
  }

  changePicDiv(
    editPic,
    youthName,
    youthURL,
    type,
    options,
    showCaption,
    picData,
  ) {
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
            <input
              id="youthName"
              placeholder={editPic.title}
              value={youthName}
              onChange={this.onChange}
            />
          </label>
          <label htmlFor="youthURL">
            Image Address
            <input
              id="youthURL"
              placeholder={editPic.url}
              value={youthURL}
              onChange={this.onChange}
            />
          </label>
          {this.forms.makeDropdown(
            'type',
            'Category',
            type,
            this.onChange,
            options,
          )}
          {this.forms.radioButtons(showCaption, this.handleRadioChange)}
          {this.picButton(picData, editPic, youthName, youthURL, type)}
        </form>
      </div>
    );
  }

  changePicForm(picData) {
    const options = [
      { type: 'youthPics', Category: 'Youth Pics' },
      { type: 'familyPics', Category: 'Family Pics' },
      { type: 'otherPics', Category: 'Other Pics' },
    ];
    const { youthURL, youthName } = this.state;
    let { type, showCaption } = this.state;
    const { editPic } = this.props;
    if (type === '' && editPic.type !== undefined) {
      type = editPic.type;
    }
    if (showCaption === '' && editPic.comments !== undefined) {
      showCaption = editPic.comments;
    }
    return this.changePicDiv(
      editPic,
      youthName,
      youthURL,
      type,
      options,
      showCaption,
      picData,
    );
  }

  deleteForumForm(forumId, books) {
    return (
      <form
        id="delete-forum"
        style={{
          textAlign: 'left',
          margin: 'auto',
          width: '100%',
          maxWidth: '100%',
        }}
      >
        {this.forms.makeDataDropdown(
          'forumId',
          '* Select Title to Delete',
          forumId,
          this.onChange,
          books,
          '_id',
          'title',
        )}
        <p> </p>
        <button
          onClick={(evt) => this.controller.deleteBookApi(evt, forumId, '/news')}
          type="button"
          disabled={this.controller.validateDeleteBook(forumId)}
        >
          Delete Announcement
        </button>
      </form>
    );
  }

  addForumForm() {
    const { announcementtitle, announcementurl, forumId } = this.state;
    const { books } = this.props;
    return (
      <div
        className="material-content elevation3"
        style={{ maxWidth: '8in', margin: '30px auto auto auto' }}
      >
        <h5>Announcements Table</h5>
        <form
          id="create-forum"
          style={{
            textAlign: 'left',
            marginLeft: '4px',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {this.forms.makeInput(
            'text',
            'Announcement Title',
            false,
            this.onChange,
            announcementtitle,
            '90%',
          )}
          {this.forms.makeInput(
            'text',
            'Announcement URL',
            false,
            this.onChange,
            announcementurl,
            '90%',
          )}
          <div style={{ marginLeft: '70%', marginTop: '10px' }}>
            <button
              type="button"
              id="addForum"
              disabled={this.controller.validateBook(
                announcementtitle,
                announcementurl,
                'Forum',
                null,
              )}
              onClick={this.controller.addForumAPI}
            >
              Add
            </button>
          </div>
        </form>
        <hr />
        {this.deleteForumForm(forumId, books)}
      </div>
    );
  }

  changeHomepage() {
    const { title, homePageContent } = this.state;
    return (
      <div className="horiz-scroll">
        <div
          className="material-content elevation3"
          style={{ width: '850px', margin: '30px auto' }}
        >
          <h5>Change Homepage Section</h5>
          <form
            id="create-homepage"
            style={{
              textAlign: 'left',
              marginLeft: '4px',
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {this.forms.makeInput(
              'text',
              'Title',
              false,
              this.onChange,
              title,
              '90%',
            )}
            <label htmlFor="content">
              Content
              <br />
              {this.controller.editor(homePageContent)}
            </label>
            <div style={{ marginLeft: '60%', marginTop: '10px' }}>
              <button
                type="button"
                id="c-h"
                disabled={false}
                onClick={this.controller.createHomeAPI}
              >
                Update Homepage
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  changeYouthForm() {
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
      buttonClick: (e) => this.controller.createPicApi(e, postBody, '/admin'),
      title: '',
      nameId: 'youthName',
    });
  }

  render() {
    const { showTable } = this.props;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>
          CLC Admin Dashboard
        </h4>
        {this.changeHomepage()}
        {this.addForumForm()}
        {this.changeYouthForm()}
        {showTable ? <PTable /> : null}
      </div>
    );
  }
}

export default withRouter(connect(mapStoreToProps)(AdminDashboard));
