import React from 'react';
import DefaultMusicContent from './MusicContent';
import commonUtils from '../../lib/commonUtils';

const Music = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Music', window.screen.width);
  return (<DefaultMusicContent />);
};

export default Music;
