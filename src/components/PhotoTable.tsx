import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { MuiThemeProvider } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import { HashLink as Link } from 'react-router-hash-link';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { connect } from 'react-redux';
import superagent from 'superagent';
import mapStoreToProps from '../redux/mapStoreToProps';
import TableTheme from '../lib/photoTableTheme';

interface Pprops {
  dispatch: (...args: any) => any,
  auth: { token: string },
  familyPics: any[],
  youthPics: any[],
  otherPics: any[],
}
interface Pstate {
  columns: any[]
}
export class PhotoTable extends Component<Pprops, Pstate> {
  superagent: superagent.SuperAgentStatic;

  constructor(props: Readonly<Pprops>) {
    super(props);
    this.superagent = superagent;
    this.setColumns = this.setColumns.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.handleHideTable = this.handleHideTable.bind(this);
    this.addThumbs = this.addThumbs.bind(this);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() { this.setColumns(); }

  setColumns() {
    const columns: any[] = [];
    const titles = ['Thumbnail', 'Title', 'Caption', 'Link', 'Type', 'Modify'];
    for (let i = 0; i < titles.length; i += 1) {
      const label = titles[i];// eslint-disable-line security/detect-object-injection
      columns.push({
        name: label.toLowerCase(),
        label,
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value: any | null | undefined) => (
            <div style={{
              margin: 0, fontSize: '12pt', maxWidth: '200px',
            }}
            >
              {label !== 'Modify' ? ReactHtmlParser(value) : value}
            </div>
          ),
        },
      });
    }
    this.setState({ columns });
  }

  async deletePic(id: any) { // eslint-disable-next-line no-restricted-globals
    const result = confirm('Deleting picture, are you sure?');// eslint-disable-line no-alert
    if (result) {
      const { auth } = this.props;
      let res: superagent.Response;
      try {
        res = await this.superagent.delete(`${process.env.BackendUrl}/book/${id}`)
          .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json');
      } catch (e) { return `${e.message}`; }
      if (res.status === 200) { window.location.reload(); return Promise.resolve(true); }
      return Promise.resolve(false);
    }
    return Promise.resolve(false);
  }

  editPic(picData: any) {
    const { dispatch } = this.props;
    dispatch({ type: 'EDIT_PIC', picData });
    return true;
  }

  handleHideTable() {
    const { dispatch } = this.props;
    dispatch({ type: 'SHOW_TABLE', showTable: false });
    return true;
  }

  addThumbs(arr: any[]): any[] {
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
    const { columns } = this.state;
    const { familyPics, youthPics, otherPics } = this.props;
    let arr: any[] = familyPics.concat(youthPics);
    arr = arr.concat(otherPics); arr = this.addThumbs(arr);
    return (
      <div className="photoTable">
        <div style={{ maxWidth: '9in', margin: 'auto' }}>
          <MuiThemeProvider theme={TableTheme}>
            <MUIDataTable
              options={{
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
              }}
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

export default connect(mapStoreToProps)(PhotoTable);
