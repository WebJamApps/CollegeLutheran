import { connect } from 'react-redux';
import { YouthContent } from './YouthContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export interface YouthProps {
  youthPics: Ibook[];
  youthContent: Ibook;
}

export function Youth({ youthPics, youthContent }: YouthProps) {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (<YouthContent youthPics={youthPics} youthContent={youthContent} />);
}
// TODO remove usage of connect here
export default connect(mapStoreToProps, null)(Youth as any);
