import renderer from 'react-test-renderer';
import { SlideShow } from 'src/containers/HabitatProject/HabitatProjectContent';

describe('Habitat Project Content', () => {
  it('Renders the SlideShow', () => {
    const page: any = renderer.create(<SlideShow />).toJSON();
    expect(page.type).toBe('div');
  });
});
