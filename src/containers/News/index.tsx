import commonUtils from 'src/lib/commonUtils';
import { useContext } from 'react';
import { ContentContext } from 'src/providers/Content.provider';
import { NewsContent } from './NewsContent';

export function News(): JSX.Element {
  const { news: { newsContent } } = useContext(ContentContext);
  commonUtils.setTitleAndScroll('News', window.screen.width);

  return <NewsContent books={newsContent} />;
}
