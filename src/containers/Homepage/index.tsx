import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import About from './About';
import WideFacebookFeed from './WideFacebookFeed';
import NarrowFacebookFeed from './NarrowFacebookFeed';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';
import ELCALogo from '../../components/elcaLogo';

type HomepageProps = {
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
  homeContent?: Ibook;
  familyPics?: Ibook[];
  youthPics?: Ibook[];
  otherPics?: Ibook[];
  musicPics?: Ibook[];
};

interface HomepageState {
  picsState: Ibook[];
  homeContent?: Ibook;
}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  commonUtils: typeof commonUtils;

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    this.state = { picsState: [] };
  }

  async componentDidMount(): Promise<void> {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    const delay = (): Promise<void> => new Promise((res) => setTimeout(res, 4000));
    return this.commonUtils.randomizePics(this, delay);
  }

  render(): JSX.Element {
    const { picsState } = this.state;
    const { width, targetRef } = this.props;
    const { homeContent } = this.props;
    return (
      <div ref={targetRef}>
        {width >= 900
          ? (
            <div className="page-content">
              <About homeContent={homeContent} width={width} allPics={picsState} />
              <hr />
              <WideFacebookFeed width={width} />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )
          : (
            <div className="page-content">
              <About homeContent={homeContent} width={width} allPics={picsState} />
              <hr />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
              <NarrowFacebookFeed allPics={picsState} />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )}
        <ELCALogo />
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
