import { connect } from 'react-redux';
import { MusicContent } from './MusicContent';
import mapStoreToProps from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export const Music = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Music', window.screen.width);
  return (<MusicContent />);
};

Music.defaultProps = { musicPics: [] };

export default connect(mapStoreToProps, null)(Music as any);
