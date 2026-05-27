import { render } from '@testing-library/react';
import { FacebookFeed, FamilySlideContainer } from 'src/containers/Homepage/NarrowFacebookFeed';

describe('NarrowFacebookFeed', () => {
  it('renders PicSlider', () => {
    const data = {
      title: 'pic1',
      _id: 'a',
      type: '',
    };
    const { container } = render(<FamilySlideContainer data={[data]} />);
    const root = container.firstChild as HTMLElement | null;
    expect(root?.className).toBe('familySlideContainer');
    expect(container.querySelector('.slick-slider')).not.toBeNull();
  });
  it('renders FacebookFeed', () => {
    const { container } = render(<FacebookFeed />);
    expect(container.firstChild?.nodeName).toBe('DIV');
  });
});
