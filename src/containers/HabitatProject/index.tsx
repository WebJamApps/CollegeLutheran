import HabitatProjectContent from './HabitatProjectContent';
import commonUtils from '../../lib/commonUtils';

const HabitatProject = (): JSX.Element => {
  commonUtils.setTitleAndScroll('Habitat Project', window.screen.width);
  return (<HabitatProjectContent />);
};
export default HabitatProject;
