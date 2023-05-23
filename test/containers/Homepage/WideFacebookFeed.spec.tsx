import WideFacebookFeed from 'src/containers/Homepage/WideFacebookFeed';
import renderer from 'react-test-renderer';

describe('WideFacebookFeed', () => {
  it('renders WideFacebookFeed', () => {
    const width = 90;
    const result = renderer.create(<WideFacebookFeed width={width} />).toJSON();
    expect(result).toMatchSnapshot();
  });
});
