import React, { Component } from 'react';
import DefaultStaffContent from './StaffContent';

export default class Staff extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'Church Staff | College Lutheran Church';
  }

  render() {
    return (
      <DefaultStaffContent />
    );
  }
}
