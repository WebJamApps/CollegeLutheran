import React, { Component } from 'react';

export default class News extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'News & Forum | College Lutheran Church';
  }

  render() {
    return (
      <div className="page-content">
        <h3 style={{ textAlign: 'center', margin: '20px', fontWeight: 'bold' }}>News &amp; Forum</h3>
        <div
          className="main"
          style={{
            paddingLeft: '20px', paddingRight: '20px', maxWidth: '9in', margin: 'auto',
          }}
        >
          <p style={{ fontSize: '40pt' }}>
            {' '}
          </p>
          <p style={{ fontSize: '14pt' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p style={{ fontSize: '14pt' }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div style={{ minHeight: '4.7in' }}>&nbsp;</div>
      </div>
    );
  }
}
