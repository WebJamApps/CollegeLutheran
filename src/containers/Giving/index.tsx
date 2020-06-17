import React from 'react';
import DefaultGivingContent from './GivingContent';
import commonUtils from '../../lib/commonUtils';

const Giving = () => {
  commonUtils.setTitleAndScroll('Giving', window.screen.width);
  return (<DefaultGivingContent />);
};
export default Giving;
