/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { Stewardship } from 'src/containers/Stewardship/index';

describe('Stewardship', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Stewardship />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
