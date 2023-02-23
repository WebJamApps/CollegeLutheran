import FamilyContent from './FamilyContent';
import commonUtils from '../../lib/commonUtils';

export const Family = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Children & Families', window.screen.width);
  return (<FamilyContent />);
};

