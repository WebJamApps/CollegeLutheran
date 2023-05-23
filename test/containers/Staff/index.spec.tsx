import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Staff } from 'src/containers/Staff';

describe('Staff', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BrowserRouter><Staff /></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
