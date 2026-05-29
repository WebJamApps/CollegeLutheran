import { connect } from 'react-redux';
import { YouthContent } from './YouthContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Youth = (
) => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (
    <YouthContent />
  );
};

export default connect(mapStoreToProps, null)(Youth as any);
