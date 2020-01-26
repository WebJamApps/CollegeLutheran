import React, { Component } from 'react';
import DefaultCalendarContent from './CalendarContent';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() {
    document.title = 'Church Calendar | College Lutheran Church';
  }

  render() {
    return (
      <DefaultCalendarContent />
    );
  }
}
