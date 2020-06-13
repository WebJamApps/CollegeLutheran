import React, { Component } from 'react';
import DefaultCalendarContent from './CalendarContent';
import commonUtils from '../../lib/commonUtils';

export default class Calendar extends Component {
  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>; };

  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Calendar', window.screen.width); }

  render() { return (<DefaultCalendarContent />); }
}
