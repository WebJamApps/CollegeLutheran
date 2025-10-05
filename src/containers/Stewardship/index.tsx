import DefaultContent from './StewardshipContent';
import commonUtils from '../../lib/commonUtils';

export function Stewardship(): JSX.Element {
  commonUtils.setTitleAndScroll('Stewardship', window.screen.width);
  return (<DefaultContent />);
}
