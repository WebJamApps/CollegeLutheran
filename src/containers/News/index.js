import React, { Component } from 'react';
import DefaultNewsContent from './NewsContent';

export default class News extends Component {
  constructor(props) { super(props); }// eslint-disable-line no-useless-constructor

  componentDidMount() { document.title = 'News & Forum | College Lutheran Church'; }

  render() {
    return (
      <div className="page-content">
        <DefaultNewsContent />
        <div style={{ minHeight: '4.7in' }}>&nbsp;</div>
      </div>
    );
  }
}
