import { Caption } from 'src/components/PicSlider/caption';
import { render } from '@testing-library/react';

describe('PicSlider', () => {
  it('renders Caption', () => {
    const props = { caption: '' };
    const { container } = render(<Caption {...props} />);
    expect((container.firstChild as HTMLElement | null)?.className).toBe('slider-caption');
  });
});
