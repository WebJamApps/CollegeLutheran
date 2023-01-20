import { connect } from 'react-redux';
import FamilyContent from './FamilyContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

// export interface FamilyProps {
//   familyPics: Ipicture[];
// }

export const Family = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Children & Families', window.screen.width);
  return (<FamilyContent />);
};

Family.defaultProps = { familyPics: [] };
// TODO remove usage of connect here
export default connect(mapStoreToProps, null)(Family as any);
