import React, { RefObject } from 'react';
import { connect } from 'react-redux';
import { withResizeDetector } from 'react-resize-detector';
import About from './About';
import WideFacebookFeed from './WideFacebookFeed';
import NarrowFacebookFeed from './NarrowFacebookFeed';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

type HomepageProps = {
  homeContent: { title: string; comments: string };
  targetRef: RefObject<HTMLDivElement>;
  width: number;
  height: number;
};

interface HomepageState {
  picsState: any[];
  homeContent?: any;
}

export class Homepage extends React.Component<HomepageProps, HomepageState> {
  static defaultProps = {
    homeContent: {},
  };

  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>;
  };

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    this.state = { picsState: [] };
  }

  async componentDidMount() {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    return this.commonUtils.randomizePics(this, window.innerWidth);
  }

  elca(w: number) { // eslint-disable-line class-methods-use-this
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

  render() {
    const { picsState } = this.state;
    const { homeContent, width, targetRef } = this.props;
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

export default connect(mapStoreToProps)(withResizeDetector(Homepage as any));
