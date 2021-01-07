import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';

export interface LiveStreamProps {
  width:number, height:number
}
export const LiveStream = ({ width, height }:LiveStreamProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  // eslint-disable-next-line no-console
  console.log(`height: ${height}`);
  return (
    <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
      {width > 931 ? <h4>Livestream</h4> : null}
      {width > 931 ? <ReactTwitchEmbedVideo layout="video-with-chat" channel="collegelutheranchurch" /> : null }
      {width < 932 ? <ReactTwitchEmbedVideo width="100%" layout="video" channel="collegelutheranchurch" /> : null }
    </div>
  );
};
export default withResizeDetector(LiveStream);
