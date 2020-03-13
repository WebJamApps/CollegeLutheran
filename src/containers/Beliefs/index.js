import React, { Component } from 'react';
import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Our Lutheran Beliefs', window.screen.width); }

  render() { return (<DefaultBeliefsContent />); }
}
