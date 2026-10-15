import DefaultHistoryContent from './HistoryContent';
import commonUtils from '../../lib/commonUtils';

export function History() {
  commonUtils.setTitleAndScroll('History', window.screen.width);
  return (<DefaultHistoryContent />);
}
