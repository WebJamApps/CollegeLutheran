// import { withResizeDetector } from 'react-resize-detector';
import commonUtils from 'src/lib/commonUtils';
import { useEffect } from 'react';
import { About } from './About';
import WideFacebookFeed from './WideFacebookFeed';
import { FacebookFeed } from './NarrowFacebookFeed';
import ELCALogo from '../../components/elcaLogo';

export function Homepage({ width }:{ width:number }): JSX.Element {
  useEffect(() => commonUtils.setTitleAndScroll('', window.screen.width), []);
  return (
    <div>
      {width >= 900
        ? (
          <div className="page-content">
            <About width={width} />
            <hr />
            <WideFacebookFeed width={width} />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )
        : (
          <div className="page-content">
            <About
              width={width}
            />
            <hr />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            <FacebookFeed />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )}
      <ELCALogo />
    </div>
  );
}
// export default withResizeDetector(Homepage);
export default Homepage;

