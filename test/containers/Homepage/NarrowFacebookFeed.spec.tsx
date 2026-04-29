import renderer from 'react-test-renderer';
import { FacebookFeed, FamilySlideContainer } from 'src/containers/Homepage/NarrowFacebookFeed';

describe('NarrowFacebookFeed', () => {
  it('renders PicSlider', () => {
    const data = {
      title: 'pic1',
      _id: 'a',
      type: '',
    };
    const result: any = renderer.create(<FamilySlideContainer data={[data]} />).toJSON();
    expect(result.props.className).toBe('familySlideContainer');
    expect(result.children[0].children[0].children[0].props.className.includes('slick-slider')).toBe(true);
  });
  it('renders FacebookFeed', () => {
    const result: any = renderer.create(<FacebookFeed />).toJSON();
    expect(result.type).toBe('div');
  });
});
