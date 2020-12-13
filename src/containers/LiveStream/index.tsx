import React from 'react';
import commonUtils from '../../lib/commonUtils';

const LiveStream = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  return (
    <div style={{ margin: 'auto', width: '98%', textAlign: 'center' }}>
      <p style={{ marginBottom: '0px' }}>This video is available during a live streaming event.</p>
      <iframe
        title="College Lutheran Church Youtube"
        width="100%"
        height="600"
        src="https://player.twitch.tv/?channel=webjammaria&parent=collegelutheran.org"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
export default LiveStream;

