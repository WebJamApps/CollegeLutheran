import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export const News = ({ books }) => {
  document.title = 'News & Forum | College Lutheran Church';
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
