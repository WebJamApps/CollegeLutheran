import React from 'react';
import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

const Staff = () => {
  commonUtils.setTitleAndScroll('Our Lutheran Beliefs', window.screen.width);
  return (<DefaultBeliefsContent />);
};
export default Staff;
