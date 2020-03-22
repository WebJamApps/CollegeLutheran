import React, { Component } from 'react';
import MUIDataTable from 'mui-datatables';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { connect } from 'react-redux';
import superagent from 'superagent';
import mapStoreToProps from '../redux/mapStoreToProps';

export class PhotoTable extends Component {
  constructor(props) {
    super(props);
    this.superagent = superagent;
    this.setColumns = this.setColumns.bind(this);
    this.getMuiTheme = this.getMuiTheme.bind(this);
    this.setColumns = this.setColumns.bind(this);
    this.addThumbs = this.addThumbs.bind(this);
    this.state = {
      columns: [],
    };
  }

  componentDidMount() { this.setColumns(); }

  getMuiTheme() { // eslint-disable-line class-methods-use-this
    return createMuiTheme({
      typography: {
        useNextVariants: true,
      },
      overrides: {
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
    const titles = ['Thumbnail', 'Title', 'Link', 'Type', 'Modify'];
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

  addThumbs(arr) { // eslint-disable-line class-methods-use-this
    const newArr = arr;
    for (let i = 0; i < arr.length; i += 1) { // eslint-disable-next-line security/detect-object-injection
      newArr[i].thumbnail = `<img src=${arr[i].url} width="200px"/>`;
      newArr[i].link = `<a href=${arr[i].url} target="_blank">click to view</a>`;// eslint-disable-line security/detect-object-injection
      newArr[i].modify = (<button type="button" onClick={() => this.deletePic(newArr[i]._id)}>Delete Pic</button>);// eslint-disable-line
    }
    return newArr;
  }

  render() {
    const { columns } = this.state;
    const { familyPics, youthPics, otherPics } = this.props;
    let arr = familyPics.concat(youthPics);
    arr = arr.concat(otherPics);
    arr = this.addThumbs(arr);
    return (
      <div className="tourTable">
        <div style={{ maxWidth: '9in', margin: 'auto' }}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
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
PhotoTable.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  // tourUpdated: PropTypes.bool.isRequired,
  auth: PropTypes.shape({ token: PropTypes.string }).isRequired,
  familyPics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  youthPics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  otherPics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStoreToProps)(PhotoTable);
