import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import WideAbout from './Widescreen/WideAbout';
import WideFacebookFeed from './Widescreen/WideFacebookFeed';
import NarrowFacebookFeed from './Narrowscreen/NarrowFacebookFeed';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export class Homepage extends Component {
  constructor(props) {
    super(props);
    this.commonUtils = commonUtils;
    this.parentRef = React.createRef();
    this.onResize = this.onResize.bind(this);
    this.state = { width: 100 };
  }

  componentDidMount() { this.commonUtils.setTitleAndScroll(''); }

  onResize(width) { this.setState({ width }); }

  elca() { // eslint-disable-line class-methods-use-this
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
            style={{ width: '340px', margin: 'auto auto auto -2px', paddingTop: '30px' }}
          />
        </a>
        <p>{' '}</p>
      </div>
    );
  }

  render() {
    const { width } = this.state;
    const { homeContent } = this.props;
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {width >= 1004
          ? (
            <div className="page-content">
              <WideAbout homeContent={homeContent} width={width} />
              <hr />
              <WideFacebookFeed width={width} />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )
          : (
            <div className="page-content">
              <WideAbout homeContent={homeContent} width={width} />
              <hr />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
              <NarrowFacebookFeed />
              <p style={{ fontSize: '6pt', marginBottom: '0' }}>&nbsp;</p>
            </div>
          )}
        {this.elca()}
        <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} targetDomEl={this.parentRef.current} />
      </div>
    );
  }
}

Homepage.defaultProps = { homeContent: {} };
Homepage.propTypes = {
  homeContent: PropTypes.shape({
    title: PropTypes.string,
    comments: PropTypes.string,
  }),
};

export default connect(mapStoreToProps, null)(Homepage);
