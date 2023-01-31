import { shallow } from 'enzyme';
import DefaultWideFacebookFeed from 'src/containers/Homepage/WideFacebookFeed';

describe('WideFacebookFeed', () => {
  const wrapper = shallow(<DefaultWideFacebookFeed />);
  it('renders snapshot correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
