import React, { Component } from 'react';
// import moment from 'moment';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';
import forms from '../../lib/forms';

export class StaffDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      // date: '',
      // time: '',
      // tickets: '',
      // more: '',
      // venue: '',
    };
    this.forms = forms;
    this.onChange = this.onChange.bind(this);
    // this.createTour = this.createTour.bind(this);
    // this.validateForm = this.validateForm.bind(this);
    // this.createTourApi = this.createTourApi.bind(this);
  }

  componentDidMount() { document.title = 'Staff Dashboard | College Lutheran Church'; }

  onChange(evt) {
    evt.preventDefault();
    this.setState({ [evt.target.id]: evt.target.value });
  }

  // validateForm() {
  //   const {
  //     date, time, location, venue,
  //   } = this.state;
  //   if (date && time && location && venue && date !== '') return false;
  //   return true;
  // }

  // createTourApi(tour1) { // eslint-disable-line class-methods-use-this
  //   const { scc, auth } = this.props;
  //   const tour = tour1;
  //   tour.datetime = new Date(tour.date);
  //   const m = moment(tour.date, 'YYYY-MM-DD');
  //   tour.date = m.format('ll');
  //   scc.emit('newTour', { tour, token: auth.token });
  //   this.setState({ redirect: true });
  //   return true;
  // }

  // createTour() {
  //   const {
  //     date, time, location, venue, tickets, more,
  //   } = this.state;
  //   const tour = {
  //     date, time, location, venue, tickets, more,
  //   };
  //   // return this.createTourApi(tour);
  // }

  // newTourForm(date, time, buttonStyle) {
  //   const {
  //     venue, location, tickets, more,
  //   } = this.state;
  //   return (
  //     <form id="new-tour" style={{ marginTop: '4px', paddingLeft: '10px' }}>
  //       {this.forms.makeInput('date', 'Date', true, this.onChange, date)}
  //       {this.forms.makeInput('text', 'Time', true, this.onChange, time)}
  //       {this.forms.makeInput('text', 'Venue', true, this.onChange, venue)}
  //       {this.forms.makeInput('text', 'Location', true, this.onChange, location)}
  //       {this.forms.makeInput('text', 'Tickets', false, this.onChange, tickets)}
  //       {this.forms.makeInput('text', 'More', false, this.onChange, more)}
  //       <div style={{ textAlign: 'right', marginTop: '10px', maxWidth: '85%' }}>
  //         <span style={{ fontSize: '16px', marginRight: '38%', fontFamily: 'Habibi' }}><i>* Required</i></span>
  //         <button style={buttonStyle} disabled={this.validateForm()} type="button" onClick={this.createTour}>Create Tour</button>
  //       </div>
  //     </form>
  //   );
  // }

  render() {
    const { redirect } = this.state;
    // const {
    //   date, time, buttonStyle, redirect,
    // } = this.state;
    return (
      <div className="page-content">
        <h3>CLC Admin Dashboard</h3>
          <div className="material-content elevation3">
            <h4 class="material-header-h4">Add Monthly Forum</h4>
            <form>
              <label>Type
              <select id="mediaType" className="form-control" value="">
                <option></option>
              </select>
              </label>
              <label>Dropbox URL to PDF
              <input value=""/></label>
              <div className="form-group">
                <ul>
                <li style={{color:red}}>
                  </li>
                </ul>
              </div>
              <button id="createMediaButton" class="button-lib">
                Submit
              </button>
            </form>
          </div>
              <hr>
          <div class="material-content elevation3" style="max-width:5in; margin:auto">
            <h4 class="material-header-h4">Delete Monthly Forum</h4>
            <form>
              <label style="padding-top:0">Select</label>
              <select id="selectBookTitle" className="form-control" value="">
                <option value=""></option>
                <option value="book._id"></option>
              </select>
              <button className="button-lib">
                Delete
              </button>
            </form>
          </div>
                    <hr>
          <div className="material-content elevation3">
            <h4 class="material-header-h4">Change Homepage Section</h4>
            <form>
              <label>Title
              <input value="homePageContent.title"/>
              </label>
              <label>Content
              <textarea rows="15" cols="32" value="homePageContent.comments"/></label>
              <button id="changeStuff" className="button-lib">
                Submit
              </button>
            </form>
          </div>
          <hr>
          <div class="material-content elevation3" style="max-width:5in; margin:auto">
            <h4 class="material-header-h4">Change Youthpage Section</h4>
            <form>
              <label>Content
              <textarea rows="15" cols="32" value="youthPageContent.comments"/></label>
              <button id="changeYouth" class="button-lib">
                Submit
              </button>
            </form>
            <hr>
            <h4 class="material-header-h4">Add Youthpage Picture from Dropbox</h4>
            <form>
              <label>Dropbox URL to Picture
              <input value="newBook.url"/></label>
              <button id="createYouthPic" className="button-lib">
                Add Pic
              </button>
            </form>
            <hr>
            <h4 class="material-header-h4">Add Youthpage Pic from Image Address</h4>
            <form>
              <label>Title
              <input value="newYouthPic.title"/></label>
              <label>Image Address
              <input value="newYouthPic.url"/></label>
              <button id="addYouthPic" className="button-lib">
                Add Pic
              </button>
            </form>
            <p style={{color:'red'}}><strong>errorMessage</strong></p>
            <hr>
            <h4 className="material-header-h4">Delete Youthpage Picture</h4>
            <form>
              <label>Select
              <select id="selectYouthPic" className="form-control" value="titleSelected">
                <option value=""></option>
                <option value="pic._id"></option>
              </select>
              </label>
              <button id="deleteYouth" className="button-lib">
                Delete
              </button>
            </form>
          </div>
          <p style="font-size:2pt">&nbsp;</p>
          <div class="material-content elevation3" style="max-width:5in; margin:auto">
            <h4 class="material-header-h4">Change Familypage Section</h4>
            <form>
              <label>Content</label>
              <textarea rows="15" cols="32" value.two-way="familyPageContent.comments"></textarea>
              <button id="changeFamily" class="button-lib" raised click.trigger="changeFamilyPage()">
                Submit
              </button>
            </form>
            <p>&nbsp;</p>
            <hr>
            <h4 class="material-header-h4">Add Familypage Pic from Dropbox</h4>
            <form>
              <label>Dropbox URL to Picture</label>
              <input value.two-way="newBook.url & validate">
              <button id="createFamilyPic" class="button-lib" style="width:70px" raised click.trigger="createFamilyPic()">
                Add Pic
              </button>
            </form>
            <p>&nbsp;</p>
            <hr>
            <h4 class="material-header-h4">Add Familypage Pic from Image Address</h4>
            <form>
              <label>Title</label>
              <input value.two-way="newFamilyPic.title" style="min-width:0" required>
              <label>Image Address</label>
              <input value.two-way="newFamilyPic.url">
              <button id="addFamilyPic" class="button-lib" style="width:70px" raised click.trigger="addFamilyPic()">
                Add Pic
              </button>
            </form>
            <p style="color:red;"><strong>${familyPicError}</strong></p>
            <p>&nbsp;</p>
            <hr>
            <h4 class="material-header-h4">Delete Familypage Picture</h4>
            <form>
              <label>Select</label>
              <select id="selectFamilyPic" class="form-control" change.delegate="showDelete()" value.bind="titleSelected" style="margin-top:0;max-width: 2.5in;overflow-wrap:break-word;word-break:break-all;">
                <option value=""></option>
                <option repeat.for="pic of familyPicsArr" value="${pic._id}" model.bind="familyPicsArr">${pic.title}</option>
              </select>
              <button if.bind="showDeleteButton" id="deleteFamily" class="button-lib" raised click.trigger="deleteFamilyPic()">
                Delete
              </button>
            </form>
          </div>
        </div>
    );
  }
}
StaffDashboard.propTypes = {
  auth: PropTypes.shape({ token: PropTypes.string }).isRequired,
};
export default withRouter(connect(mapStoreToProps)(StaffDashboard));
