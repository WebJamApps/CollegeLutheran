import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import About from './About';
import WideFacebookFeed from './WideFacebookFeed';
import NarrowFacebookFeed from './NarrowFacebookFeed';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

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

  elca(w: number): JSX.Element { // eslint-disable-line class-methods-use-this
    const width = w < 420 ? '300px' : '400px';
    return (
      <div style={{
        textAlign: 'center', margin: 'auto', paddingTop: 0, paddingBottom: 0,
      }}
      >
        <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
          <img
            id="elcaLogo"
            alt="ELCA LOGO"
            src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
            style={{ width, margin: 'auto auto auto -2px', paddingTop: '30px' }}
          />
        </a>
        <p>{' '}</p>
      </div>
    );
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
        {this.elca(width)}
      </div>
    );
  }
}

export default connect(mapStoreToProps, null)(withResizeDetector(Homepage));
