/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { HashLink as Link } from 'react-router-hash-link';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { connect } from 'react-redux';
import superagent from 'superagent';
import mapStoreToProps from '../redux/mapStoreToProps';

interface PhotoTableProps {
  dispatch: (...args: any) => any;
  auth: { token: string };
  familyPics: any;
  youthPics: any;
  otherPics: any;
}

type PhotoTableState = {
  columns: any[];
  options: {
    filterType: string,
    pagination: boolean,
    responsive: string,
    filter: boolean,
    download: boolean,
    search: boolean,
    print: boolean,
    viewColumns: boolean,
    selectableRows: string,
    fixedHeader: boolean };
};

export class PhotoTable extends Component<PhotoTableProps, PhotoTableState> {
  superagent: superagent.SuperAgentStatic;

  constructor(props) {
    super(props);
    this.superagent = superagent;
    this.setColumns = this.setColumns.bind(this);
    this.getMuiTheme = this.getMuiTheme.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.handleHideTable = this.handleHideTable.bind(this);
    this.addThumbs = this.addThumbs.bind(this);
    this.state = {
      columns: [],
      options: {
        filterType: 'dropdown',
        pagination: false,
        responsive: 'scrollMaxHeight',
        filter: false,
        download: false,
        search: false,
        print: false,
        viewColumns: false,
        selectableRows: 'none',
        fixedHeader: false,
      },
    };
  }

  componentDidMount() { this.setColumns(); }

  getMuiTheme() { // eslint-disable-line class-methods-use-this
    return createMuiTheme({
      // @ts-ignore
      typography: { useNextVariants: true },
      overrides: {
        // @ts-ignore
        MUIDataTableHeadCell: {
          root: {
            padding: '4px', fontWeight: 'bold', color: 'black', fontSize: '11pt',
          },
        },
        MuiTableRow: { head: { height: '40px' } },
        MuiTableCell: { root: { padding: '4px' } },
        MUIDataTableToolbar: { actions: { display: 'none' }, root: { paddingLeft: 0, minHeight: 'inherit' } },
        MUIDataTable: { responsiveScroll: { maxHeight: '4.3in' } },
        MuiTypography: { h6: { color: 'black', fontWeight: 'bold', fontStyle: 'italic' } },
      },
    });
  }

  setColumns() {
    const columns = [];
    const titles = ['Thumbnail', 'Title', 'Caption', 'Link', 'Type', 'Modify'];
    for (let i = 0; i < titles.length; i += 1) {
      const label = titles[i];// eslint-disable-line security/detect-object-injection
      columns.push({
        name: label.toLowerCase(),
        label,
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value) => (
            <div style={{
              margin: 0, fontSize: '12pt', maxWidth: '200px',
            }}
            >
              { label !== 'Modify' ? ReactHtmlParser(value) : value }
            </div>
          ),
        },
      });
    }
    this.setState({ columns });
  }

  async deletePic(id) { // eslint-disable-next-line no-restricted-globals
    const result = confirm('Deleting picture, are you sure?');// eslint-disable-line no-alert
    if (result) {
      const { auth } = this.props;
      let res;
      try {
        res = await this.superagent.delete(`${process.env.BackendUrl}/book/${id}`)
          .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json');
      } catch (e) {
        console.log(e.message);// eslint-disable-line no-console
        return Promise.resolve(false);
      }
      if (res.status === 200) { window.location.reload(); return Promise.resolve(true); }
      return Promise.resolve(false);
    }
    return Promise.resolve(false);
  }

  editPic(picData) {
    const { dispatch } = this.props;
    dispatch({ type: 'EDIT_PIC', picData });
    return true;
  }

  handleHideTable() {
    const { dispatch } = this.props;
    dispatch({ type: 'SHOW_TABLE', showTable: false });
    return true;
  }

  addThumbs(arr) {
    const newArr = arr;/* eslint-disable security/detect-object-injection */
    for (let i = 0; i < arr.length; i += 1) { // eslint-disable-next-line security/detect-object-injection
      newArr[i].thumbnail = `<img src=${arr[i].url} width="200px"/>`;
      const deletePicId = `deletePic${newArr[i]._id}`;// eslint-disable-line security/detect-object-injection
      const editPicId = `editPic${newArr[i]._id}`;// eslint-disable-line security/detect-object-injection
      newArr[i].link = `<a href=${arr[i].url} target="_blank">click to view</a>`;// eslint-disable-line security/detect-object-injection
      newArr[i].caption = newArr[i].comments === 'showCaption' ? 'display' : 'hide';
      newArr[i].modify = (// eslint-disable-line security/detect-object-injection
        <div>
          <button type="button" id={deletePicId} onClick={() => this.deletePic(newArr[i]._id)}>Delete Pic</button>
          <p>{' '}</p>
          <Link to="/admin/#picsForm">
            <button type="button" id={editPicId} onClick={() => { this.editPic(newArr[i]); this.handleHideTable(); }}>
              Edit Pic
            </button>
          </Link>
        </div>
      );
    }
    return newArr;
  }

  render() {
    const { columns, options } = this.state;
    const {
      familyPics, youthPics, otherPics,
    } = this.props;
    let arr = familyPics.concat(youthPics);
    arr = arr.concat(otherPics);
    arr = this.addThumbs(arr);
    return (
      <div className="photoTable">
        <div style={{ maxWidth: '9in', margin: 'auto' }}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
            // @ts-ignore
              options={options}
              columns={columns}
              data={arr}
              title="All Images"
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(PhotoTable);
