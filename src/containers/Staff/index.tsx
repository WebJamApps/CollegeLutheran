import React, { Component } from 'react';
import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

export default class Staff extends Component {
  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>; };

  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Staff', window.screen.width); }

  render() { return (<DefaultStaffContent />); }
}
