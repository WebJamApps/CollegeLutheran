import React, { Component } from 'react';
import DefaultMusicContent from './MusicContent';
import commonUtils from '../../lib/commonUtils';

export class Music extends Component {
  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>; };

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
