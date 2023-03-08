import { connect } from 'react-redux';
import { YouthContent } from './YouthContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

// export interface YouthProps {
//   youthPics: Ibook[];
//   youthContent: Ibook;
// }

export const Youth = (
  // { youthPics, youthContent } : YouthProps
): JSX.Element => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (
    // <YouthContent youthPics={youthPics} />
    <YouthContent />
  );
};

Youth.defaultProps = { youthPics: [] };

export default connect(mapStoreToProps, null)(Youth as any);
