import React from 'react';
import { connect } from 'react-redux';
import DefaultYouthContent from './YouthContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export interface YouthProps {
  youthPics?: Ibook[];
  youthContent: Ibook;
}

export const Youth = ({ youthPics, youthContent }: YouthProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (<DefaultYouthContent youthPics={youthPics} youthContent={youthContent} />);
};

Youth.defaultProps = { youthPics: [] };

export default connect(mapStoreToProps, null)(Youth);
