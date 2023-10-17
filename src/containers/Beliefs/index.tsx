import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

export const Beliefs = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Our Lutheran Beliefs', window.screen.width);
  return (<DefaultBeliefsContent />);
};
