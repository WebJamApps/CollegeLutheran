import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export class Youth extends Component {
  constructor(props) {
    super(props);
    this.children = props.children;// eslint-disable-line react/prop-types
  }

  componentDidMount() { document.title = 'Youth Ministry | College Lutheran Church'; }

  render() {
    const { youthPics } = this.props;
    return (
      <DefaultYouthContent youthPics={youthPics} />
    );
  }
}

Youth.defaultProps = { youthPics: [] };
Youth.propTypes = {
  youthPics: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
};

export default connect(mapStoreToProps, null)(Youth);
