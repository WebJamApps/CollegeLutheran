import { useContext } from 'react';
import DefaultContent from './EventContent';
import commonUtils from '../../lib/commonUtils';
import { ContentContext } from '../../providers/Content.provider';

export function Event() {
  const { content: { eventPage } } = useContext(ContentContext);
  commonUtils.setTitleAndScroll(eventPage?.title || 'Event', window.screen.width);
  return (<DefaultContent />);
}
