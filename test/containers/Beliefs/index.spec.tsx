import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Beliefs } from 'src/containers/Beliefs';

describe('Beliefs', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<BrowserRouter><Beliefs /></BrowserRouter>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
