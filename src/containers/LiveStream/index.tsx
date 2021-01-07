import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';

export interface LiveStreamProps {
  width:number, height:number
}
const LiveStream = ({ width, height }:LiveStreamProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  console.log(`width: ${width}`);
  console.log(`height: ${height}`);
  return (
    <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
      <h4>Livestream</h4>
      <ReactTwitchEmbedVideo channel="collegelutheranchurch" />
    </div>
  );
};
export default withResizeDetector(LiveStream);
