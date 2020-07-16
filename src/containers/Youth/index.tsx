import React from 'react';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps, { Store } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Youth = ({ youthPics }: Store['youthPics']): JSX.Element => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (<DefaultYouthContent youthPics={youthPics} />);
};

Youth.defaultProps = { youthPics: [] };

export default connect(mapStoreToProps, null)(Youth);
