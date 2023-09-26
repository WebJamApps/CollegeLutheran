import { GivingContent } from './GivingContent';
import commonUtils from '../../lib/commonUtils';

export const Giving = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Giving', window.screen.width);
  return (<GivingContent />);
};

