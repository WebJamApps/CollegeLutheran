import { Caption } from 'src/components/PicSlider/caption';
import renderer from 'react-test-renderer';

describe('PicSlider', () => {
  it('renders Caption', () => {
    const props = { caption: '' };
    const result: any = renderer.create(<Caption {...props} />).toJSON();
    expect(result.props.className).toBe('slider-caption');
  });
});
