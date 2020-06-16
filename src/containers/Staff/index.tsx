import React from 'react';
import DefaultStaffContent from './StaffContent';
import commonUtils from '../../lib/commonUtils';

const Staff = () => {
  commonUtils.setTitleAndScroll('Church Staff', window.screen.width);
  return (<DefaultStaffContent />);
};
export default Staff;
