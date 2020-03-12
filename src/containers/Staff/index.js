import React, { Component } from 'react';
import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Staff', window.screen.width); }

  render() { return (<DefaultStaffContent />); }
}
