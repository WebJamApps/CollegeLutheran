import { News } from 'src/containers/News/index';
import renderer from 'react-test-renderer';

describe('News', () => {
  it('renders correctly', () => {
    const result: any = renderer.create(<News />).toJSON();
    expect(result.type).toBe('div');
  });
});
