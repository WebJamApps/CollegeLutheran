import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const News = ({ books }) => {
  commonUtils.setTitleAndScroll('News & Forum');
  books.sort((a, b) => {
    const dataA = a.created_at.split('T')[0];
    const dateB = b.created_at.split('T')[0];
    if (dataA < dateB) return 1;
    if (dataA > dateB) return -1;
    return 0;
  });
  return <DefaultNewsContent books={books} />;
};

News.defaultProps = { books: [] };
News.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      comments: PropTypes.string,
    }),
  ),
};

export default connect(mapStoreToProps, null)(News);
