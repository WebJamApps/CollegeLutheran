import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultFamilyContent from './FamilyContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Family = ({ familyPics }) => {
  commonUtils.setTitleAndScroll('Children & Families');
  return (<DefaultFamilyContent familyPics={familyPics} />);
};

Family.defaultProps = { familyPics: [] };
Family.propTypes = {
  familyPics: PropTypes.arrayOf(PropTypes.shape({
    comments: PropTypes.string,
  })),
};

export default connect(mapStoreToProps, null)(Family);
