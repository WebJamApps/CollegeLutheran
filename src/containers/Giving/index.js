import React, { Component } from 'react';
import DefaultGivingContent from './GivingContent';
import commonUtils from '../../lib/commonUtils';

export default class Giving extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Giving'); }

  render() { return (<DefaultGivingContent />); }
}
