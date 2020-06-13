import React, { Component } from 'react';
import DefaultGivingContent from './GivingContent';
import commonUtils from '../../lib/commonUtils';

export default class Giving extends Component {
  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>; };

  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Giving', window.screen.width); }

  render() { return (<DefaultGivingContent />); }
}
