/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { Family } from '../../src/containers/Family/index';

describe('Family', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Family />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
