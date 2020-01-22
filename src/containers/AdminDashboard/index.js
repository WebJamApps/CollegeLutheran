import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import superagent from 'superagent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.superagent = superagent;
    this.state = {
      title: '', homePageContent: '',
      // redirect: '',
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    this.createHome = this.createHome.bind(this);
  }

  componentDidMount() { document.title = 'Staff Dashboard | College Lutheran Church'; }

  onChange(evt) { return this.setState({ [evt.target.id]: evt.target.value }); }

  // validateForm() {
  //   const {
  //     date, time, location, venue,
  //   } = this.state;
  //   if (date && time && location && venue && date !== '') return false;
  //   return true;
  // }
  async createHome() {
    console.log(this.state);
    const { auth } = this.props;
    const { title, homePageContent } = this.state;
    let r;
    try {
      r = await this.superagent.put(`${process.env.BackendUrl}/book/one?type=homePageContent`)
        .set('Authorization', `Bearer ${auth.token}`)
        .set('Accept', 'application/json')
        .send({ title, comments: homePageContent, type: 'homePageContent' });
    } catch (e) { console.log(e.message); return Promise.resolve(false); }
    console.log(r);
    if (r.status === 200) {
      window.location.assign('/');
      return Promise.resolve(true);
    }
    console.log(r.body);
    return Promise.resolve(false);
  }

  render() {
    const { title, homePageContent } = this.state;
    // const { redirect } = this.state;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>CLC Admin Dashboard</h4>
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
        <p>{' '}</p>
        <div className="material-content elevation3" style={{ maxWidth: '320px', margin: 'auto' }}>
          <h5>Add Monthly Forum</h5>
          {/* <form>
            <label htmlFor="dropbox-url">
Full URL to PDF
              <input id="dropbox-url" value="" />
            </label>
            <button type="button" id="createMediaButton" className="button-lib">
                Submit
            </button>
          </form>
          <hr /> */}
          {/* <h5>Delete Monthly Forum</h5>
          <form>
            <label htmlFor="selectBookTitle">
Select
              <br />
              <select id="selectBookTitle" className="form-control" value="" />
            </label>
            <button type="button" className="button-lib">
                Delete
            </button>
          </form> */}
        </div>
        {/*
        <p>{' '}</p>
        <div className="material-content elevation3">
          <h4 className="material-header-h4">Change Youthpage Section</h4>
          <form>
            <label htmlFor="youth-content">
Content
              <textarea if="youth-content" rows="15" cols="32" value="youthPageContent.comments" />
            </label>
            <button type="button" id="changeYouth" className="button-lib">
                Submit
            </button>
          </form>
          <hr />
          <h4 className="material-header-h4">Add Youthpage Pic from Image Address</h4>
          <form>
            <label htmlFor="youth-pic-title">
Title
              <input id="youth-pic-title" value="newYouthPic.title" />
            </label>
            <label htmlFor="youth-pic-url">
Image Address
              <input id="youth-pic-url" value="newYouthPic.url" />
            </label>
            <button type="button" id="addYouthPic" className="button-lib">
                Add Pic
            </button>
          </form>
          <p style={{ color: 'red' }}><strong>errorMessage</strong></p>
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
              <input id="family-pic-title" value="newFamilyPic.title" />
            </label>
            <label htmlFor="family-pic-url">
Image Address
              <input id="family-pic-url" value="newFamilyPic.url" />
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
};
export default withRouter(connect(mapStoreToProps)(AdminDashboard));
