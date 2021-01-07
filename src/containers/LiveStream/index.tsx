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
  const src = `https://www.twitch.tv/embed/collegelutheranchurch/chat?parent=${window.location.hostname}`;
  return (
    <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
      {width > 600 ? <h5>Livestream</h5> : null}
      {width > 931 ? <ReactTwitchEmbedVideo layout="video-with-chat" channel="collegelutheranchurch" /> : null }
      {width < 932 ? <ReactTwitchEmbedVideo width="100%" height="400" layout="video" channel="collegelutheranchurch" /> : null }
      {width < 932 ? (
        <iframe
          title="twitch-chat"
          frameBorder="0"
          scrolling="no"
          src={src}
          height="300"
          width="100%"
        />
      ) : null }
    </div>
  );
};
export default withResizeDetector(LiveStream);
