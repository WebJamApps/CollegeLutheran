import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import WideAboutUs from './Widescreen/WideAbout';
import WideFacebookFeed from './Widescreen/WideFacebookFeed';
import NarrowFacebookFeed from './Narrowscreen/NarrowFacebookFeed';
// import NarrowAboutUs from './Narrowscreen/NarrowAbout';
// import Inquiry from '../../components/inquiry';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.state = { width: 100 };
  }

  componentDidMount() { document.title = 'College Lutheran Church'; }

  onResize(width) { this.setState({ width }); }

  render() {
    const { width } = this.state;
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
              <NarrowFacebookFeed />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )}
        <div style={{
          textAlign: 'center', margin: 'auto', paddingTop: 0, paddingBottom: 0,
        }}
        >
          <a href="http://www.elca.org/" target="_blank" rel="noopener noreferrer">
            <img
              id="elcaLogo"
              alt="ELCA LOGO"
              src="https://dl.dropboxusercontent.com/s/wkzubcmmm3pqst4/elca-logo.png?dl=0"
              style={{ width: '340px', margin: 'auto auto auto -2px', paddingTop: '30px' }}
            />
          </a>
          <p>{' '}</p>
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} targetDomEl={this.parentRef.current} />
      </div>
    );
  }
}
