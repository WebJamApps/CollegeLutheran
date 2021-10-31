import React from 'react';
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
      {width > 600 ? <h5>Livestream</h5> : null}
      {width > 931 ? <iframe src="https://vimeo.com/event/595402/embed" width="930" height="620" frameBorder="0" 
      allow="autoplay; fullscreen; picture-in-picture" allowFullScreen>
      </iframe>
        : 
        null 
      }
      {width < 932 ? 
      <iframe src="https://vimeo.com/event/595402/embed" width="100%" height="360" frameBorder="0" 
      allow="autoplay; fullscreen; picture-in-picture" allowFullScreen
      >
      </iframe>
        : null 
      }
    </div>
  );
};
export default withResizeDetector(LiveStream);
