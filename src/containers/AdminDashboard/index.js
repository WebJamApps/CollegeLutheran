import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
      title: '',
      homePageContent: '',
      forumtitle: '',
      forumurl: '',
      youthName: '',
      youthURL: '',
      forumId: '',
      childName: '',
      childURL: '',
      otherName: '',
      otherURL: '',
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
    this.addForumForm = this.addForumForm.bind(this);
    this.changePicForm = this.changePicForm.bind(this);
    this.changeFamilyForm = this.changeFamilyForm.bind(this);
    this.deleteForumForm = this.deleteForumForm.bind(this);
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Admin Dashboard'); }

  onChange(evt, stateValue) {
    return typeof stateValue === 'string' ? this.setState({ [stateValue]: evt.target.value })
      : this.setState({ [evt.target.id]: evt.target.value });
  }

  changePicForm(picData) {
    const imageUrlValue = this.state[picData.urlId];// eslint-disable-line react/destructuring-assignment
    const imageNameValue = this.state[picData.nameId];// eslint-disable-line react/destructuring-assignment
    return (
      <div className="material-content elevation3" style={{ maxWidth: '320px', margin: 'auto' }}>
        <h4 className="material-header-h4">
          Add
          {' '}
          {picData.title}
          {' '}
          Pictures
        </h4>
        <form>
          <label htmlFor={picData.nameId}>
            Picture Name
            <input id={picData.nameId} value={imageNameValue} onChange={this.onChange} />
          </label>
          <label htmlFor={picData.urlId}>
            Image Address
            <input id={picData.urlId} value={imageUrlValue} onChange={this.onChange} />
          </label>
          <div style={{ marginLeft: '70%' }}>
            <p>{' '}</p>
            <button disabled={picData.disabled()} type="button" id={picData.buttonId} onClick={picData.buttonClick}>Add Pic</button>
          </div>
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
    const { forumtitle, forumurl, forumId } = this.state;
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
          {this.forms.makeInput('text', 'Title', false, this.onChange, forumtitle, '90%')}
          {this.forms.makeInput('text', 'URL', false, this.onChange, forumurl, '90%')}
          <div style={{ marginLeft: '70%' }}>
            <p>{' '}</p>
            <button
              type="button"
              id="addForum"
              disabled={this.controller.validateBook(forumtitle, forumurl)}
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
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: 'auto' }}>
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
            <textarea id="homePageContent" rows="15" value={homePageContent} style={{ width: '90%' }} onChange={this.onChange} />
          </label>
          <div style={{ marginLeft: '60%' }}>
            <button type="button" id="c-h" disabled={false} onClick={this.controller.createHomeAPI}>Update Homepage</button>
          </div>
        </form>
      </div>
    );
  }

  changeFamilyForm(childName, childURL) {
    const postBody = {
      title: childName, url: childURL, comments: childURL, type: 'familyPics', access: 'CLC',
    };
    return (
      this.changePicForm({
        disabled: () => this.controller.validateBook(childName, childURL),
        buttonId: 'addFamilyPic',
        buttonClick: (e) => this.controller.createPicApi(e, postBody, '/family'),
        title: 'Family',
        nameId: 'childName',
        urlId: 'childURL',
      })
    );
  }

  changeOtherPics(otherName, otherURL) {
    const postBody = {
      title: otherName, url: otherURL, comments: otherURL, type: 'otherPics', access: 'CLC',
    };
    return (
      this.changePicForm({
        title: 'Other',
        nameId: 'otherName',
        urlId: 'otherURL',
        disabled: () => this.controller.validateBook(otherName, otherURL),
        buttonId: 'addOtherPic',
        buttonClick: (e) => this.controller.createPicApi(e, postBody, ''),
      })
    );
  }

  changeYouthForm() {
    const { youthName, youthURL } = this.state;
    const postBody = {
      title: youthName, url: youthURL, comments: youthURL, type: 'youthPics', access: 'CLC',
    };
    return this.changePicForm({
      disabled: () => this.controller.validateBook(youthName, youthURL),
      buttonId: 'addYouthPic',
      buttonClick: (e) => this.controller.createPicApi(e, postBody, '/youth'),
      deleteSection: () => null,
      title: 'Youth',
      nameId: 'youthName',
      urlId: 'youthURL',
    });
  }

  render() {
    const {
      childName, childURL, otherName, otherURL,
    } = this.state;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
        {this.changeHomepage()}
        <p>{' '}</p>
        {this.addForumForm()}
        <p>{' '}</p>
        {this.changeYouthForm()}
        <p>{' '}</p>
        {this.changeFamilyForm(childName, childURL)}
        <p>{' '}</p>
        {this.changeOtherPics(otherName, otherURL)}
        <p>{' '}</p>
        <PTable />
      </div>
    );
  }
}
AdminDashboard.propTypes = {
  auth: PropTypes.shape({ token: PropTypes.string }).isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default withRouter(connect(mapStoreToProps)(AdminDashboard));
