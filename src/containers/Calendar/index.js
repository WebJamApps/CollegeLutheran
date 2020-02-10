import React, { Component } from 'react';
import DefaultCalendarContent from './CalendarContent';
import commonUtils from '../../lib/commonUtils';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Calendar'); }

  render() { return (<DefaultCalendarContent />); }
}
