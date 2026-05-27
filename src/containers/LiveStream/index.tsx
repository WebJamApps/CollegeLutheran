import { useResizeDetector } from 'react-resize-detector';
import commonUtils from '../../lib/commonUtils';

const makeSpace = (width: number) => {
  let space = '0px';
  if (width < 900 && width > 768) space = '34vh';
  if (width < 769) space = '38vh';
  return space;
};

export interface LiveStreamProps {
  width: number
}
export const LiveStream = ({ width }: LiveStreamProps) => {
  commonUtils.setTitleAndScroll('Livestream', window.screen.width);
  const src = `https://www.youtube.com/embed/live_stream?channel=${process.env.CHANNEL_ID}`;
  return (
    <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
      {width > 600 ? <h5 style={{ marginTop: '0.5rem' }}>Welcome to Our Livestream Page</h5> : null}
      <p>
        The video below is embedded from YouTube, however if it does not play properly,
        please click one of the following links to view the live church service.
        <br />
        {' '}
        <a
          style={{ fontWeight: 'bold' }}
          target="_blank"
          href="https://www.youtube.com/@collegelutheranchurch/streams"
          rel="noreferrer"
        >
          YouTube Live
        </a>
        {' '}
        |
        {' '}
        <a
          style={{ fontWeight: 'bold' }}
          target="_blank"
          href="https://www.facebook.com/CollegeLutheranChurch/videos/?ref=page_internal"
          rel="noreferrer"
        >
          Facebook Videos
        </a>
        {' '}
        -
        These links also provide a way to view previous church services that were recorded.
      </p>
      {width > 931 ? (
        <iframe
          title="Live Stream Wide"
          src={src}
          width="930"
          height="620"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )
        : null}
      <div style={{ marginTop: '20px' }}>
        <iframe
          title="facebook-live-feed"
          // eslint-disable-next-line max-len
          src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FCollegeLutheranChurch&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
          width={width > 500 ? '500' : '100%'}
          height="500"
          style={{
            border: 'none',
            overflow: 'hidden',
            maxWidth: '500px',
          }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          loading="lazy"
        />
      </div>
      {width < 932
        ? (
          <iframe
            title="Live Stream Small"
            src={src}
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
export default function DefaultLiveStream() {
  const { width, ref } = useResizeDetector<HTMLDivElement>();
  return <div ref={ref}><LiveStream width={width || 0} /></div>;
}
