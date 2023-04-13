import { connect } from 'react-redux';
import commonUtils from 'src/lib/commonUtils';
import type { Ibook } from 'src/providers/Content.provider';
import DefaultNewsContent from './NewsContent';
import mapStoreToProps from '../../redux/mapStoreToProps';

export function News(props: { books: Ibook[] }): JSX.Element {
  const { books } = props;
  commonUtils.setTitleAndScroll('News', window.screen.width);
  books.sort((a, b) => {
    if (a.created_at && b.created_at) {
      const dataA = a.created_at.split('T')[0];
      const dateB = b.created_at.split('T')[0];
      if (dataA < dateB) return 1;
      if (dataA > dateB) return -1;
    }
    return 0;
  });
  return <DefaultNewsContent books={books} />;
}

export default connect(mapStoreToProps, null)(News as any);
