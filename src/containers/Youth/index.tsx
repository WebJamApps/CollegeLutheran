import React from 'react';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Youth = ({ youthPics }: any): JSX.Element => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (<DefaultYouthContent youthPics={youthPics} />);
};

Youth.defaultProps = { youthPics: [] };

export default connect(mapStoreToProps, null)(Youth);
