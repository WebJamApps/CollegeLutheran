/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { YouthContent } from 'src/containers/Youth/YouthContent';

describe('YouthContent', () => {
  it('renders with a PicSlider', () => {
    const pic = {
      _id: '6351c399b45YgfsOg7rM3bCPL', title: 'whatever', type: 'youth', url: 'sdfadfasd',
    };
    const youthContent: any = renderer
      .create(<YouthContent
        youthPics={[pic]}
        youthContent={{
          title: 'title', comments: '...', _id: 'test', type: 'sata',
        }}
      />)
      .toJSON();
    const result = youthContent.children[0].children[0].children[0].props.className;
    expect(result).toBe('slick-slider slick-initialized');
  });
});
