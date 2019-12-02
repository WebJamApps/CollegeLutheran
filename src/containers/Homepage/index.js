import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import WideAboutUs from './Widescreen/WideAbout';
import WideFacebookFeed from './Widescreen/WideFacebookFeed';
// import NarrowAboutUs from './Narrowscreen/NarrowAbout';
import FacebookFeed from './Narrowscreen/NarrowFacebookFeed';
import Inquiry from '../../components/inquiry';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.state = { width: 100, nodeEnv: process.env.NODE_ENV };
  }

  componentDidMount() { document.title = 'College Lutheran Church'; }

  onResize(width) { this.setState({ width }); }

  render() {
    const { width, nodeEnv } = this.state;
    return (
      <div>
        {width >= 1004
          ? (
            <div className="page-content">
              <WideAboutUs width={width} />
              <hr />
              <WideFacebookFeed />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )
          : (
            <div className="page-content">
              <WideAboutUs width={width} />
              <hr />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
              <FacebookFeed />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
              {nodeEnv !== 'production' ? <Inquiry /> : null}
            </div>
          )}
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} targetDomEl={this.parentRef.current} />
      </div>
    );
  }
}
