import { shallow } from 'enzyme';
import Stewardship from 'src/containers/Stewardship/index';
import DefaultContent from 'src/containers/Stewardship/StewardshipContent';

function setup() {
  const props = {};
  const wrapper = shallow(<Stewardship />);
  return { props, wrapper };
}

describe('Giving', () => {
  it('Renders the Giving component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(DefaultContent)
      .dive()
      .find('div.page-content')
      .exists()).toBe(true);
  });
  it('renders snapshot correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
});
