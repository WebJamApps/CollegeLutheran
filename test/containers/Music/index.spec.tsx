import renderer from 'react-test-renderer';
import { Music } from 'src/containers/Music/index';

describe('Music', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Music musicPics={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
