import { Caption } from 'src/components/PicSlider/caption';
import renderer from 'react-test-renderer';

describe('PicSlider', () => {
  it('renders Caption', () => {
    const props = { caption: '' };
    const result: any = renderer.create(<Caption {...props} />).toJSON();
    console.log(result.props.className);
    expect(result.props.className).toBe('slider-caption');
  });
});
