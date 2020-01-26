import React, { Component } from 'react';
import DefaultBeliefsContent from './BeliefsContent';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'Our Lutheran Beliefs | College Lutheran Church';
  }

  render() {
    return (
      <DefaultBeliefsContent />
    );
  }
}
