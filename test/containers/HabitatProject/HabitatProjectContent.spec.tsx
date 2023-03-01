import renderer from 'react-test-renderer';
import { SlideShow } from 'src/containers/HabitatProject/HabitatProjectContent';

describe('Habitat Project Content', () => {
  it('Renders the SlideShow', () => {
    const images = [{ type: 'otherPics', title: 'pics', _id: 'uuid' }];
    const page: any = renderer.create(<SlideShow />).toJSON();
    expect(page.type).toBe('div');
  });
});
