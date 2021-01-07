
import React from 'react';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';

import commonUtils from '../../lib/commonUtils';

const LiveStream = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  return (
    <div style={{ margin: 'auto', width: '98%', textAlign: 'center' }}>
      <h4>Livestream</h4>
      <ReactTwitchEmbedVideo channel="collegelutheranchurch" />
    </div>
  );
};
export default LiveStream;
