import commonUtils from 'src/lib/commonUtils';
import { useContext } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import DefaultNewsContent from './NewsContent';

export function News(): JSX.Element {
  const { news: { newsContent } } = useContext(ContentContext);
  commonUtils.setTitleAndScroll('News', window.screen.width);
  newsContent.sort((a, b) => {
    if (a.created_at && b.created_at) {
      const dataA = a.created_at.split('T')[0];
      const dateB = b.created_at.split('T')[0];
      if (dataA < dateB) return 1;
      if (dataA > dateB) return -1;
    }
    return 0;
  });
  return <DefaultNewsContent books={newsContent} />;
}
// export default connect(mapStoreToProps, null)(News as any);
