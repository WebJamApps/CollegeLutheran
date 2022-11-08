import { connect } from 'react-redux';
import DefaultMusicContent from './MusicContent';
import mapStoreToProps, { Ibook } from '../../redux/mapStoreToProps';
import commonUtils from '../../lib/commonUtils';

export interface MusicProps {
  musicPics?: Ibook[];
}

export const Music = ({ musicPics }: MusicProps): JSX.Element => {
  commonUtils.setTitleAndScroll('Music', window.screen.width);
  return (<DefaultMusicContent musicPics={musicPics} />);
};

Music.defaultProps = { musicPics: [] };
// TODO remove usage of connect here
export default connect(mapStoreToProps, null)(Music as any);
