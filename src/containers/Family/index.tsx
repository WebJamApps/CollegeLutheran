import React from 'react';
import { connect } from 'react-redux';
import DefaultFamilyContent from './FamilyContent';
import mapStoreToProps, { Store } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Family = ({ familyPics }: Store['familyPics']): JSX.Element => {
  commonUtils.setTitleAndScroll('Children & Families', window.screen.width);
  return (<DefaultFamilyContent familyPics={familyPics} />);
};

Family.defaultProps = { familyPics: [] };

export default connect(mapStoreToProps, null)(Family);
