import React, { Component } from 'react';
import superagent from 'superagent';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';
import AdminController from './AdminController';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.controller = new AdminController(this);
    this.superagent = superagent;
    this.state = {
      title: '',
      homePageContent: '',
      forumtitle: '',
      forumurl: '',
      youthName: '',
      youthURL: '',
      forumId: '',
      youthPicsId: '',
      childName: '',
      childURL: '',
      familyPicsId: '',
    };
    this.forms = forms;
    this.validateYouth = this.validateYouth.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createHome = this.createHome.bind(this);
    this.changeHomepage = this.changeHomepage.bind(this);
    this.validateForum = this.validateForum.bind(this);
    this.addForum = this.addForum.bind(this);
    this.addForumAPI = this.addForumAPI.bind(this);
    this.validateChild = this.validateChild.bind(this);
    this.changePicForm = this.changePicForm.bind(this);
    this.deleteYouth = this.deleteYouth.bind(this);
    this.createPicApi = this.createPicApi.bind(this);
    this.deleteFamily = this.deleteFamily.bind(this);
    this.validateDeleteFamily = this.validateDeleteFamily.bind(this);
  }

  componentDidMount() { document.title = 'Admin Dashboard | College Lutheran Church'; }

  onChange(evt, stateValue) {
    return typeof stateValue === 'string' ? this.setState({ [stateValue]: evt.target.value })
      : this.setState({ [evt.target.id]: evt.target.value });
  }

  async createPicApi(evt, body, redirect) {
    evt.preventDefault();
    let r;
    const { auth } = this.props;
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

  validateYouth() {
    const { youthName, youthURL } = this.state;
    if (youthName !== '' && youthURL !== '') return false;
    return true;
  }

  validateDeleteFamily() {
    const { familyPicsId } = this.state;
    if (familyPicsId !== '') return false;
    return true;
  }

  deleteYouth() {
    const { youthPicsId } = this.state;
    const { youthPics } = this.props;
    return (
      <form
        id="delete-youth"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        { this.forms.makeDropdown('youthPicsId', '* Select Youth to Delete', youthPicsId, this.onChange, youthPics, '_id', 'title') }
        <button
          onClick={(evt) => this.controller.deleteBookApi(evt, youthPicsId, '/youth')}
          type="button"
          className="button-lib"
          disabled={this.validateDeleteYouth()}
        >
        Delete Youth
        </button>
      </form>
    );
  }

  deleteFamily() {
    const { familyPicsId } = this.state;
    const { familyPics } = this.props;
    return (
      <form
        id="delete-family"
        style={{
          textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
        }}
      >
        { this.forms.makeDropdown('familyPicsId', '* Select Family to Delete', familyPicsId, this.onChange, familyPics, '_id', 'title') }
        <button
          onClick={(evt) => this.controller.deleteBookApi(evt, familyPicsId, '/family')}
          type="button"
          className="button-lib"
          disabled={this.validateDeleteFamily()}
        >
        Delete Family
        </button>
      </form>
    );
  }

  changePicForm(picData) {
    return (
      <div className="material-content elevation3" style={{ maxWidth: '320px', margin: 'auto' }}>
        <h4 className="material-header-h4">
Change
          {' '}
          {picData.title}
          {' '}
Pictures
        </h4>
        <form>
          <label htmlFor={picData.nameId}>
            Picture Name
            <input
              id={picData.nameId}
              value={this.state[picData.nameId]}// eslint-disable-line react/destructuring-assignment
              onChange={this.onChange}
            />
          </label>
          <label htmlFor={picData.urlId}>
            Image Address
            <input
              id={picData.urlId}
              value={this.state[picData.urlId]}// eslint-disable-line react/destructuring-assignment
              onChange={this.onChange}
            />
          </label>
          <div style={{ marginLeft: '70%' }}>
            <p>{' '}</p>
            <button disabled={picData.disabled()} type="button" id={picData.buttonId} onClick={picData.buttonClick}>
            Add Pic
            </button>
          </div>
        </form>
        <hr />
        {picData.deleteSection()}
      </div>
    );
  }

  validateChild() {
    const { childName, childURL } = this.state;
    if (childName !== '' && childURL !== '') return false;
    return true;
  }

  async createHome() {
    const { auth } = this.props;
    const { title, homePageContent } = this.state;
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

  async addForumAPI() {
    const { auth } = this.props;
    const { forumtitle, forumurl } = this.state;
    let r;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/book`).set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({
          title: forumtitle,
          url: forumurl,
          comments: forumurl,
          type: 'Forum',
          access: 'CLC',
        });
    } catch (e) { console.log(e.message); return Promise.resolve(false); } // eslint-disable-line no-console
    if (r.status === 201) {
      window.location.assign('/news');
      return Promise.resolve(true);
    } console.log(r.body); // eslint-disable-line no-console
    return Promise.resolve(false);
  }

  validateForum() {
    const { forumtitle, forumurl } = this.state;
    if (forumtitle !== '' && forumurl !== '') return false;
    return true;
  }

  validateDeleteForum() {
    const { forumId } = this.state;
    if (forumId !== '') return false;
    return true;
  }

  validateDeleteYouth() {
    const { youthPicsId } = this.state;
    if (youthPicsId !== '') return false;
    return true;
  }

  addForum() {
    const { forumtitle, forumurl, forumId } = this.state;
    const { books } = this.props;
    return (
      <div className="material-content elevation3" style={{ maxWidth: '8in', margin: 'auto' }}>
        <h5>Change Monthly Forum</h5>
        <form
          id="create-forum"
          style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
        >
          {this.forms.makeInput('text', 'Forum Title', false, this.onChange, forumtitle, '90%')}
          {this.forms.makeInput('text', 'Forum URL', false, this.onChange, forumurl, '90%')}
          <div style={{ marginLeft: '70%' }}>
            <p>{' '}</p>
            <button type="button" id="addForum" disabled={this.validateForum()} onClick={this.addForumAPI}>Add Forum</button>
          </div>
        </form>
        <hr />
        <form
          id="delete-forum"
          style={{
            textAlign: 'left', margin: 'auto', width: '100%', maxWidth: '100%',
          }}
        >
          { this.forms.makeDropdown('forumId', '* Select Forum to Delete', forumId, this.onChange, books, '_id', 'title') }
          <button
            onClick={(evt) => this.controller.deleteBookApi(evt, forumId, '/news')}
            type="button"
            className="button-lib"
            disabled={this.validateDeleteForum()}
          >
          Delete Forum
          </button>
          <p>{' '}</p>
        </form>
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
            <button type="button" id="changeStuff" disabled={false} onClick={this.createHome}>
              Update Homepage
            </button>
          </div>
        </form>
      </div>
    );
  }

  render() {
    const {
      youthName, youthURL, childName, childURL,
    } = this.state;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
        {this.changeHomepage()}
        <p>{' '}</p>
        {this.addForum()}
        <p>{' '}</p>
        {this.changePicForm({
          title: 'Youth',
          nameId: 'youthName',
          urlId: 'youthURL',
          disabled: this.validateYouth,
          buttonId: 'addYouthPic',
          buttonClick: (e) => this.createPicApi(e, {
            title: youthName,
            url: youthURL,
            comments: youthURL,
            type: 'youthPics',
            access: 'CLC',
          }, '/youth'),
          deleteSection: this.deleteYouth,
        })}
        <p>{' '}</p>
        {this.changePicForm({
          title: 'Family',
          nameId: 'childName',
          urlId: 'childURL',
          disabled: this.validateChild,
          buttonId: 'addFamilyPic',
          buttonClick: (e) => this.createPicApi(e, {
            title: childName,
            url: childURL,
            comments: childURL,
            type: 'familyPics',
            access: 'CLC',
          }, '/family'),
          deleteSection: this.deleteFamily,
        })}
        {/* {this.childForm()} */}
        {/* <p style={{ color: 'red' }}><strong>errorMessage</strong></p>
          <hr />
          <h4 className="material-header-h4">Delete Youthpage Picture</h4>
          <form>
            <label htmlFor="delete-youth-pic">
            Select
             <select id="delete-youth-pic" className="form-control" value="titleSelected" />
            </label>
            <button type="button" id="deleteYouth" className="button-lib">
                Delete
            </button>
          </form>
        </div>
        <p>{' '}</p>
        <div className="material-content elevation3">
          <h4 className="material-header-h4">Change Familypage Section</h4>
          <form>
            <label htmlFor="family-content">
              Content
              <textarea id="family-content" rows="15" cols="32" value="familyPageContent.comments" />
            </label>
            <button type="button" id="changeFamily" className="button-lib">
                Submit
            </button>
          </form>
          <hr />
          <h4 className="material-header-h4">Add Familypage Pic from Image Address</h4>
          <form>
            <label htmlFor="family-pic-title">
              Title
              <inpformt id="family-pic-url" value="newFamilyPic.url" />
            </label>
            <button type="button" id="addFamilyPic" className="button-lib">
                Add Pic
            </button>
          </form>
          <p style={{ color: 'red' }}>
            <strong>
            familyPicError
            </strong>
          </p>
          <hr />
          <h4 className="material-header-h4">Delete Familypage Picture</h4>
          <form>
            <label htmlFor="delete-family-pic">
              Select
              <select id="delete-family-pic" className="form-control" />
            </label>
            <button type="button" id="deleteFamily" className="button-lib">
                Delete
            </button>
          </form>
        </div> */}
      </div>
    );
  }
}
AdminDashboard.propTypes = {
  auth: PropTypes.shape({ token: PropTypes.string }).isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  youthPics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  familyPics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};
export default withRouter(connect(mapStoreToProps)(AdminDashboard));
