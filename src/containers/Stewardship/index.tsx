import DefaultContent from './StewardshipContent';
import commonUtils from '../../lib/commonUtils';

export function Stewardship() {
  commonUtils.setTitleAndScroll('Stewardship', window.screen.width);
  return (<DefaultContent />);
}
