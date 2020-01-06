import React, { Component } from 'react';
import DefaultGivingContent from './GivingContent';

export default class Giving extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'Giving | Our Lutheran Church';
  }

  render() {
    return (
      <DefaultGivingContent />
    );
  }
}
