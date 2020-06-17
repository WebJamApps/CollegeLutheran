import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactResizeDetector from 'react-resize-detector';
import About from './About';
import WideFacebookFeed from './WideFacebookFeed';
import NarrowFacebookFeed from './NarrowFacebookFeed';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

type HomepageProps = {
  homeContent: {
    title: string;
    comments: string;
  }
};

interface HomepageState {
  width: number;
  picsState: any[];
  homeContent?: any;
}

export class Homepage extends Component<HomepageProps, HomepageState> {
  static defaultProps = {
    homeContent: {},
  };

  commonUtils: {
    setTitleAndScroll: (pageTitle: any, width: any) => void;
    randomizePics: (view: any, w: any) => Promise<void>; delay: (ms: any) => Promise<unknown>; };

  parentRef: React.RefObject<unknown>;

  constructor(props: HomepageProps) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.state = { width: 100, picsState: [] };
  }

  async componentDidMount() {
    this.commonUtils.setTitleAndScroll('', window.screen.width);
    return this.commonUtils.randomizePics(this, window.innerWidth);
  }

  onResize(width: number) { this.setState({ width }); }

  elca(w:number) { // eslint-disable-line class-methods-use-this
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
    const { width, picsState } = this.state;
    const { homeContent } = this.props;
    return (
      <div>
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
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} targetDomEl={this.parentRef.current} />
      </div>
    );
  }
}

export default connect(mapStoreToProps)(Homepage as any);
