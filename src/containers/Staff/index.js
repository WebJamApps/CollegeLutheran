import React, { Component } from 'react';
import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Staff'); }

  render() {
    return (
      <DefaultStaffContent />
    );
  }
}
