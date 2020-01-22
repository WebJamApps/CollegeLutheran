import React, { Component } from 'react';
import superagent from 'superagent';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';

export class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      youthURL: '',
      youthName: '',
    };
    this.forms = forms;
    this.createYouth = this.createYouth.bind(this);
    this.createYouthApi = this.createYouthApi.bind(this);
    this.onChange = this.onChange.bind(this);
    this.superagent = superagent;
  }

  componentDidMount() {
    document.title = 'Staff Dashboard | College Lutheran Church';
  }

  onChange(evt) {
    evt.preventDefault();
    this.setState({ [evt.target.id]: evt.target.value });
  }

  /* TODO: Fix POST url */
  async createYouthApi(youthForm1) {
    let r;
    const youthForm = youthForm1;
    try {
      r = await this.superagent.post(`${process.env.BackendUrl}/newYouthPic`)
        .set('Content-Type', 'application/json')
        .send(youthForm);
    } catch (e) {
      return Promise.reject(e);
    }
    this.setState({ redirect: true });
    return Promise.resolve(r.status);
  }

  createYouth() {
    const {
      youthName, youthURL,
    } = this.state;
    const youthForm = {
      youthName, youthURL,
    };
    return this.createYouthApi(youthForm);
  }

  youthForm(youthName, youthURL, redirect) {
    return (
      <div
        className="material-content elevation3"
        style={{ maxWidth: '320px', margin: 'auto' }}
      >
        {redirect ? <Redirect to="/youth" /> : null}
        <hr />
        <h4 className="material-header-h4">
            Add Youthpage Pic from Image Address
        </h4>
        <form>
          <label htmlFor="youthName">
              Picture Name
            <input id="youthName" value={youthName} onChange={this.onChange} />
          </label>
          <label htmlFor="youthURL">
              Image Address
            <input id="youthURL" value={youthURL} onChange={this.onChange} />
          </label>
          <button type="button" id="addYouthPic" className="button-lib" onClick={this.createYouth}>
              Add Pic
          </button>
        </form>
      </div>
    );
  }

  // validateForm() {
  //   const {
  //     date, time, location, venue,
  //   } = this.state;
  //   if (date && time && location && venue && date !== '') return false;
  //   return true;
  // }

  render() {
    const { youthName, youthURL, redirect } = this.state;
    return (
      <div className="page-content">
        <h4 style={{ textAlign: 'center', marginTop: '10px' }}>
          CLC Admin Dashboard
        </h4>
        <div
          className="material-content elevation3"
          style={{ maxWidth: '320px', margin: 'auto' }}
        >
          <h5>Add Monthly Forum</h5>
          <form>
            <label htmlFor="dropbox-url">
              Full URL to PDF
              <input id="dropbox-url" value="" />
            </label>
            <button type="button" id="createMediaButton" className="button-lib">
              Submit
            </button>
          </form>
          <hr />
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
        <div className="material-content elevation3" style={{ maxWidth: '8in', margin: 'auto' }}>
          <h5>Change Homepage Section</h5>
          <form style={{
            textAlign: 'left', marginLeft: '4px', width: '100%', maxWidth: '100%',
          }}
          >
            <label htmlFor="title" style={{ textAlign: 'left' }}>
              Title
              <br />
              <input id="title" />
            </label>
            <label htmlFor="content">
              Content
              <br />
              <textarea id="content" rows="15" value="homePageContent.comments" style={{ width: '90%' }} />
            </label>
            <div style={{ marginLeft: '60%' }}>
              <button type="button" id="changeStuff">
                Submit
              </button>
            </div>
          </form>
        </div>
        */}
        {/*
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
          */}

        { this.youthForm(youthName, youthURL, redirect) }

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
};
export default withRouter(connect(mapStoreToProps)(AdminDashboard));
