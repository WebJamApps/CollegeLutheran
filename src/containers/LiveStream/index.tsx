import { withResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';

const makeSpace = (width: number) => {
  let space = '0px';
  if (width < 900 && width > 768) space = '34vh';
  if (width < 769) space = '38vh';
  return space;
};

export interface LiveStreamProps {
  width: number, height: number
}
export const LiveStream = ({ width }: LiveStreamProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  return (
    <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
      {width > 600 ? <h5 style={{ marginTop: '0.5rem' }}>Welcome to Our Livestream Page</h5> : null}
      <p>
        The video below will only play during an actual livestream event. To view past services, click to visit our
        {' '}
        <a target="_blank" href="https://www.youtube.com/@collegelutheranchurch2611/streams" rel="noreferrer">YouTube</a>
        {' '}
        or
        {' '}
        <a target="_blank" href="https://www.facebook.com/CollegeLutheranChurch/videos/?ref=page_internal" rel="noreferrer">Facebook</a>
        {' '}
        pages.
      </p>
      {width > 931 ? (
        <iframe
          title="Live Stream Wide"
          src="https://player.restream.io/?token=261fc02e28664618bdb68072cfeeb786"
          width="930"
          height="620"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )
        : null}
      {width < 932
        ? (
          <iframe
            title="Live Stream Small"
            src="https://player.restream.io/?token=261fc02e28664618bdb68072cfeeb786"
            width="100%"
            height="360"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        )
        : null}
      <div style={{ marginTop: makeSpace(width) }}>
        &nbsp;
      </div>
    </div>
  );
};
export default withResizeDetector(LiveStream);
