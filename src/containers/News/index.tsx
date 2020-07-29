import React from 'react';
import { connect } from 'react-redux';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export function News(props: { books: Ibook[] }): JSX.Element {
  const { books } = props;
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

export default connect(mapStoreToProps, null)(News);
