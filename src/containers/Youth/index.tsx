import { connect } from 'react-redux';
import type { Ipicture } from 'src/Providers/PicsProvider';
import { YouthContent } from './YouthContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export interface YouthProps {
  youthPics: Ipicture[];
  youthContent: Ibook;
}

export const Youth = ({ youthPics, youthContent }: YouthProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Youth Ministry', window.screen.width);
  return (<YouthContent youthPics={youthPics} youthContent={youthContent} />);
};
// TODO remove usage of connect here
export default connect(mapStoreToProps, null)(Youth as any);
