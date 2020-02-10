import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Youth = ({ youthPics }) => {
  commonUtils.setTitleAndScroll('Youth Ministry');
  return (<DefaultYouthContent youthPics={youthPics} />);
};

Youth.defaultProps = { youthPics: [] };
Youth.propTypes = {
  youthPics: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
};

export default connect(mapStoreToProps, null)(Youth);
