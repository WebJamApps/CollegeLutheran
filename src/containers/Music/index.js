import React, { Component } from 'react';
import DefaultMusicContent from './MusicContent';
import commonUtils from '../../lib/commonUtils';

export class Music extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
    this.state = {};
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll('Music', window.screen.width); }

  render() {
    return (
      <DefaultMusicContent />
    );
  }
}

export default Music;
