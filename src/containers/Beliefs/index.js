import React, { Component } from 'react';
import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Our Lutheran Beliefs'); }

  render() {
    return (
      <DefaultBeliefsContent />
    );
  }
}
