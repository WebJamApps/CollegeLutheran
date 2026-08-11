import commonUtils from 'src/lib/commonUtils';
import { useEffect } from 'react';
import { About } from './About';
import WideFacebookFeed from './WideFacebookFeed';
import { FacebookFeed } from './NarrowFacebookFeed';
import ELCALogo from '../../components/elcaLogo';

export function Homepage({ width }: { width: number }) {
  useEffect(() => commonUtils.setTitleAndScroll('', window.screen.width), []);
  return (
    <div>
      {width >= 900
        ? (
          <div className="page-content">
            <About width={width} />
            <hr style={{ marginTop: 0, marginBottom: '4px' }} />
            <WideFacebookFeed width={width} />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )
        : (
          <div className="page-content">
            <About
              width={width}
            />
            <hr style={{ marginTop: 0, marginBottom: '4px' }} />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            <FacebookFeed />
            <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
          </div>
        )}
      <ELCALogo />
    </div>
  );
}
export default Homepage;

