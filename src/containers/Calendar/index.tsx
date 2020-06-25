import React, { Component } from 'react';
import DefaultCalendarContent from './CalendarContent';
import commonUtils from '../../lib/commonUtils';

export default class Calendar extends Component {
  commonUtils: {setTitleAndScroll: (pageTitle: string, width: number) => void;};

  constructor(props: Readonly<any>) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Church Calendar', window.screen.width); }

  render() { return (<DefaultCalendarContent />); }
}
