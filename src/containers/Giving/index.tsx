import React from 'react';
import { GivingContent } from './GivingContent';
import commonUtils from '../../lib/commonUtils';

const Giving = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Giving', window.screen.width);
  return (<GivingContent />);
};
export default Giving;
