import renderer from 'react-test-renderer';
import Beliefs from 'src/containers/Beliefs';

describe('Beliefs', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Beliefs />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
