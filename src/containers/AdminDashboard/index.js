import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';
import AdminController from './AdminController';
import commonUtils from '../../lib/commonUtils';
import PTable from '../../components/PhotoTable';

export class AdminDashboard extends Component {
  constructor(props) {
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
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.checkEdit = this.checkEdit.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
    this.addForumForm = this.addForumForm.bind(this);
    this.changePicForm = this.changePicForm.bind(this);
    this.deleteForumForm = this.deleteForumForm.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.deletePicButton = this.deletePicButton.bind(this);
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Admin Dashboard'); }

  onChange(evt, stateValue) {
    this.checkEdit();
    return typeof stateValue === 'string' ? this.setState({ [stateValue]: evt.target.value })
      : this.setState({ [evt.target.id]: evt.target.value });
  }

  checkEdit() {
    let { youthName, youthURL, type } = this.state;
    const { editPic } = this.props;
    if (youthName === '' && editPic.title !== undefined) { youthName = editPic.title; }
    if (youthURL === '' && editPic.url !== undefined) { youthURL = editPic.url; }
    if (type === '' && editPic.type !== undefined) { type = editPic.type; }
    this.setState({ youthName, youthURL, type });
  }

  handleEditorChange(homePageContent) {
    console.log(homePageContent);// eslint-disable-line no-console
    this.setState({ homePageContent });
  }

  editor() {
    const { homePageContent } = this.state;
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

  deletePicButton(picData, editPic) {
    return (
      <div style={{ marginLeft: '70%', marginTop: '10px' }}>
        <button
          disabled={picData.disabled()}
          type="button"
          id={picData.buttonId}
          onClick={editPic._id ? this.controller.editPicAPI : picData.buttonClick}
        >
          {editPic._id ? 'Edit' : 'Add'}
          {' '}
          Pic
        </button>
      </div>
    );
  }

  changePicForm(picData) {
    const options = [{ type: 'youthPics', Category: 'Youth Pics' },
      { type: 'familyPics', Category: 'Family Pics' },
      { type: 'otherPics', Category: 'Other Pics' }];// eslint-disable-next-line react/destructuring-assignment
    let { type, youthURL, youthName } = this.state;
    const { editPic } = this.props;
    if (youthURL === '' && editPic.url !== undefined) { youthURL = editPic.url; }
    if (youthName === '' && editPic.title !== undefined) { youthName = editPic.title; }
    if (type === '' && editPic.type !== undefined) { type = editPic.type; }
    return (
      <div className="material-content elevation3" style={{ maxWidth: '320px', margin: 'auto' }}>
        <h4 className="material-header-h4">
          {editPic._id ? 'Edit' : 'Add'}
          {' '}
          Pictures
        </h4>
        <form>
          <label htmlFor="youthName">
            Picture Title
            <input id="youthName" value={youthName} onChange={this.onChange} />
          </label>
          <label htmlFor="youthURL">
            Image Address
            <input id="youthURL" value={youthURL} onChange={this.onChange} />
          </label>
          {this.forms.makeDropdown('type', 'Category', type, this.onChange, options)}
          {this.deletePicButton(picData, editPic)}
        </form>
      </div>
    );
  }

  deleteForumForm(forumId, books) {
    return (
      <form
        id="delete-forum"
        style={{
          textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '100%',
        }}
      >
        { this.forms.makeDropdown('forumId', '* Select Title to Delete', forumId, this.onChange, books, '_id', 'title') }
        <p>{' '}</p>
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
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: 'auto' }}>
        <h5>Announcements Table</h5>
        <form
          id="create-forum"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {this.forms.makeInput('text', 'Announcement Title', false, this.onChange, announcementtitle, '90%')}
          {this.forms.makeInput('text', 'Announcement URL', false, this.onChange, announcementurl, '90%')}
          <div style={{ marginLeft: '70%', marginTop: '10px' }}>
            <button
              type="button"
              id="addForum"
              disabled={this.controller.validateBook(announcementtitle, announcementurl, 'Forum')}
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
    const { title } = this.state;
    return (
      <div className="horiz-scroll">
        <div className="material-content elevation3" style={{ width: '850px', margin: 'auto' }}>
          <h5>Change Homepage Section</h5>
          <form
            id="create-homepage"
            style={{
              textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
            }}
          >
            {this.forms.makeInput('text', 'Title', false, this.onChange, title, '90%')}
            <label htmlFor="content">
              Content
              <br />
              {this.editor()}
            </label>
            <div style={{ marginLeft: '60%', marginTop: '10px' }}>
              <button type="button" id="c-h" disabled={false} onClick={this.controller.createHomeAPI}>Update Homepage</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  changeYouthForm() {
    const { youthName, youthURL, type } = this.state;
    const postBody = {
      title: youthName, url: youthURL, comments: youthURL, type, access: 'CLC',
    };
    return this.changePicForm({
      disabled: () => this.controller.validateBook(youthName, youthURL, type),
      buttonId: 'addYouthPic',
      buttonClick: (e) => this.controller.createPicApi(e, postBody, '/admin'),
      title: '',
      nameId: 'youthName',
    });
  }

  render() {
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
        {this.changeHomepage()}
        <p>{' '}</p>
        <p>{' '}</p>
        <hr />
        {this.addForumForm()}
        <p>{' '}</p>
        {this.changeYouthForm()}
        <p>{' '}</p>
        <PTable />
      </div>
    );
  }
}
AdminDashboard.defaultProps = { editPic: {} };
AdminDashboard.propTypes = {
  editPic: PropTypes.shape({
    _id: PropTypes.string, type: PropTypes.string, title: PropTypes.string, url: PropTypes.string,
  }),
  homeContent: PropTypes.shape({ title: PropTypes.string, comments: PropTypes.string }).isRequired,
  auth: PropTypes.shape({ token: PropTypes.string }).isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default withRouter(connect(mapStoreToProps)(AdminDashboard));
