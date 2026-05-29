import { render } from '@testing-library/react';
import PicSlider from 'src/components/PicSlider';

describe('PicSlider', () => {
  it('renders with a caption', () => {
    const data = [
      {
        type: 'otherPics', url: 'https://test.com', title: 'test', _id: '123', comments: '',
      },
      {
        type: 'otherPics', comments: 'showCaption', url: 'https://test2.com', title: 'test2', _id: '345',
      },
    ];
    const result: any = render(<PicSlider data={data} />).container;
    expect(result).toMatchSnapshot();
  });
});
