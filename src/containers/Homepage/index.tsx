import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import fetch from 'src/lib/fetch';
import { About } from './About';
import WideFacebookFeed from './WideFacebookFeed';
import { FacebookFeed } from './NarrowFacebookFeed';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';
import ELCALogo from '../../components/elcaLogo';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  homeContent?: Ibook;
};

interface HomepageState {
  picsState: Ibook[];
  homeContent?: Ibook;
}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  fetch: typeof fetch;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    this.fetch = fetch;
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    this.fetch.fetchGet(this, 'book/one?type=homePageContent', 'GOT_HOMEPAGE');
  }

  render(): JSX.Element {
    const { width, targetRef } = this.props;
    const { homeContent } = this.props;
    return (
      <div ref={targetRef}>
        {width >= 900
          ? (
            <div className="page-content">
              <About homeContent={homeContent} width={width} />
              <hr />
              <WideFacebookFeed width={width} />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )
          : (
            <div className="page-content">
              <About homeContent={homeContent} width={width} />
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
}
// TODO remove usage of connect here
export default connect(mapStoreToProps, null)(withResizeDetector(Homepage) as any);
