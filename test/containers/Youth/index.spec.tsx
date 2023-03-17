/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { Youth } from 'src/containers/Youth/index';

describe('Youth', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Youth youthPics={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
