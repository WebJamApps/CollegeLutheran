import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

export const Staff = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Church Staff', window.screen.width);
  return (<DefaultStaffContent />);
};

