import React, { Component } from 'react';
import DefaultMusicContent from './MusicContent';

export class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() { document.title = 'Music | College Lutheran Church'; }

  render() {
    return (
      <DefaultMusicContent />
    );
  }
}

export default Music;
