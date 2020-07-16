import React from 'react';
import DefaultGivingContent from './GivingContent';
import commonUtils from '../../lib/commonUtils';

const Giving = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Giving', window.screen.width);
  return (<DefaultGivingContent />);
};
export default Giving;
