import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

export const Beliefs = () => {
  commonUtils.setTitleAndScroll('Our Lutheran Beliefs', window.screen.width);
  return (<DefaultBeliefsContent />);
};
