import React from 'react';
import { connect } from 'react-redux';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps, { Book } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export function News(props: { books?: Book[]}): JSX.Element {
  let { books } = props;
  if (!books)books = [];
  commonUtils.setTitleAndScroll('News', window.screen.width);
  books.sort((a, b) => {
    const dataA = a.created_at.split('T')[0];
    const dateB = b.created_at.split('T')[0];
    if (dataA < dateB) return 1;
    if (dataA > dateB) return -1;
    return 0;
  });
  return <DefaultNewsContent books={books} />;
}

News.defaultProps = { books: [] };

export default connect(mapStoreToProps, null)(News);
