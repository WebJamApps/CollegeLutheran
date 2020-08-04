import React from 'react';
import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

const Staff = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Church Staff', window.screen.width);
  return (<DefaultStaffContent />);
};
export default Staff;
