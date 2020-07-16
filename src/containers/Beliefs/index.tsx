import React from 'react';
import DefaultBeliefsContent from './BeliefsContent';
import commonUtils from '../../lib/commonUtils';

const Staff = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Our Lutheran Beliefs', window.screen.width);
  return (<DefaultBeliefsContent />);
};
export default Staff;
