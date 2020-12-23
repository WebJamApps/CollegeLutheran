import React, { RefObject } from 'react';
import { withResizeDetector } from 'react-resize-detector';
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
    const { targetRef } = this.props;
    let twitchUrl = 'https://player.twitch.tv/?channel=collegelutheranchurch&parent=localhost',
      chatUrl = 'https://www.twitch.tv/embed/collegelutheranchurch/chat?parent=localhost';
    if (process.env.NODE_ENV === 'production') {
      twitchUrl = 'https://player.twitch.tv/?channel=collegelutheranchurch&parent=collegelutheran.com/livestream';
    }
    if (process.env.NODE_ENV === 'production') {
      chatUrl = 'https://player.twitch.tv/?channel=collegelutheranchurch&parent=collegelutheran.com/livestream';
    }
    return (
      <div ref={targetRef} className="twitch-container">
        <div className="twitch-video">
          <iframe
            title="twitch-livestream-video"
            src={twitchUrl}
            height="80%"
            width="100%"
            frameBorder="0"
            scrolling="no"
            allowFullScreen
          />
        </div>
        <div className="twitch-chat">
          <iframe
            title="twitch-livestream-chat"
            frameBorder="0"
            scrolling="yes"
            id="chat_embed"
            src={chatUrl}
            height="80%"
            width="100%"
          />
        </div>
      </div>
    );
  }
}

export default (withResizeDetector(LiveStream));
