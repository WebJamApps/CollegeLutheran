import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

export const Staff = () => {
  commonUtils.setTitleAndScroll('Church Staff', window.screen.width);
  return (<DefaultStaffContent />);
};

