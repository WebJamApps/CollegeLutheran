import React, { Component } from 'react';
import DefaultGivingContent from './GivingContent';
import commonUtils from '../../lib/commonUtils';

export default class Giving extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Giving'); }

  render() {
    return (
      <DefaultGivingContent />
    );
  }
}
