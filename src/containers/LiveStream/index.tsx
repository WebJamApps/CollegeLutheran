import React, { RefObject } from 'react';
import { withResizeDetector } from 'react-resize-detector';
import ReactTwitchEmbedVideo from 'react-twitch-embed-video';
import commonUtils from '../../lib/commonUtils';

type LiveStreamProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

export class LiveStream extends React.Component<LiveStreamProps> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  constructor(props: LiveStreamProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  }

  render(): JSX.Element {
    const { width, targetRef } = this.props;
    return (
      <div ref={targetRef}>
        {width >= 900
          ? (
            <div className="page-content">
              <div style={{ margin: 'auto', width: '98%', textAlign: 'center' }}>
                <h4>Livestream</h4>
                <ReactTwitchEmbedVideo channel="collegelutheranchurch" />
              </div>
            </div>
          )
          : (
            <div className="page-content">
              <div className="twitch-video">
                <iframe
                  title="twitch-livestream-video"
                  src="https://player.twitch.tv/?channel=collegelutheranchurch&parent=localhost&muted=true"
                  height="350"
                  width="auto"
                  frameBorder="0"
                  scrolling="no"
                  allowFullScreen
                />
              </div>
              <div className="twitch-chat">
                <iframe
                  title="twitch-livestream-chat"
                  frameBorder="0"
                  scrolling="no"
                  id="chat_embed"
                  src="https://www.twitch.tv/embed/collegelutheranchurch/chat?parent=localhost"
                  height="500"
                  width="350"
                />
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default (withResizeDetector(LiveStream));
