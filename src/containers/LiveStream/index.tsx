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
        src="https://www.youtube.com/embed/live_stream?channel=UCOra1rXiO-BHzMDNlLd9hFQ"
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
};
export default LiveStream;

