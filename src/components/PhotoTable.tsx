import React, { Dispatch } from 'react';
import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import MUIDataTable, { MUIDataTableColumnDef } from 'mui-datatables';
import parser from 'html-react-parser';
import { HashLink as Link } from 'react-router-hash-link';
import { connect } from 'react-redux';
import superagent from 'superagent';
import mapStoreToProps, { Ibook } from '../redux/mapStoreToProps';

interface Pprops {
  dispatch: Dispatch<unknown>,
  auth: { token: string },
  familyPics: Ibook[],
  youthPics: Ibook[],
  otherPics: Ibook[],
  musicPics: Ibook[],
}
interface Pstate {
  columns: MUIDataTableColumnDef[]
}
export class PhotoTable extends React.Component<Pprops, Pstate> {
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

  componentDidMount(): void { this.setColumns(); }

  handleHideTable(): boolean {
    const { dispatch } = this.props;
    dispatch({ type: 'SHOW_TABLE', showTable: false });
    return true;
  }

  setColumns(): void {
    const columns: MUIDataTableColumnDef[] = [];
    const titles = ['Thumbnail', 'Title', 'Caption', 'Link', 'Type', 'Modify'];
    for (let i = 0; i < titles.length; i += 1) {
      const label = titles[i];// eslint-disable-line security/detect-object-injection
      columns.push({
        name: label.toLowerCase(),
        label,
        options: {
          filter: false,
          sort: true,
          customBodyRender: (value: string) => (
            <div style={{
              margin: 0, fontSize: '12pt', maxWidth: '200px',
            }}
            >
              {label !== 'Modify' ? parser(value) : value}
            </div>
          ),
        },
      });
    }
    this.setState({ columns });
  }

  async deletePic(id: string): Promise<string> { // eslint-disable-next-line no-restricted-globals
    const result = confirm('Deleting picture, are you sure?');// eslint-disable-line no-alert
    if (result) {
      const { auth } = this.props;
      let res: superagent.Response;
      try {
        res = await this.superagent.delete(`${process.env.BackendUrl}/book/${id}`)
          .set('Authorization', `Bearer ${auth.token}`).set('Accept', 'application/json');
      } catch (e) { 
        store.addNotification({
          title: id,
          message: 'Failed to Delete Photo',
          type: 'warning',
          insert: 'top',
          container: 'top-right',
          animationIn: ['animate__animated animate__fadeIn'],
          animationOut: ['animate__animated animate__fadeOut'],
          dismiss: { duration: 5000, onScreen: true, 
          }, 
        });
        return `${(e as Error).message}`; 
      }
      if (res.status === 200) { window.location.reload(); return 'deleted pic'; }
      return `${res.status} ${res.body}`;
    }
    return 'no delete';
  }

  editPic(picData: Ibook): boolean {
    const { dispatch } = this.props;
    // eslint-disable-next-line no-param-reassign
    delete picData.modify;
    dispatch({ type: 'EDIT_PIC', picData });
    return true;
  }

  addThumbs(arr: Ibook[]): Ibook[] {
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

  render(): JSX.Element {
    const { columns } = this.state;
    const {
      familyPics, youthPics, otherPics, musicPics,
    } = this.props;
    let arr: Ibook[] = familyPics.concat(youthPics).concat(musicPics);
    arr = arr.concat(otherPics); arr = this.addThumbs(arr);
    return (
      <div className="photoTable">
        <div style={{ maxWidth: '9in', margin: 'auto' }}>
          <MUIDataTable
            options={{
              filterType: 'dropdown',
              pagination: false,
              responsive: 'standard',
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
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(PhotoTable);
