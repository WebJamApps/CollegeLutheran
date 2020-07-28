import React from 'react';
import { connect } from 'react-redux';
import DefaultFamilyContent from './FamilyContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export interface FamilyProps {
  familyPics?: Ibook[];
}

const pageName = ('Children & Families');

export const Family = ({ familyPics }: FamilyProps): JSX.Element => {
  commonUtils.setTitleAndScroll(`${pageName}`, window.screen.width);
  return (<DefaultFamilyContent familyPics={familyPics} />);
};

Family.defaultProps = { familyPics: [] };

export default connect(mapStoreToProps, null)(Family);
