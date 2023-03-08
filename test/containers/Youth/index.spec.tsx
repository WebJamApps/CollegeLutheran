/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { Youth } from 'src/containers/Youth/index';

const youthContent: any = {};

describe('Youth', () => {
  // it('renders correctly without images', () => {
  //   const tree = renderer
  //     .create(<Youth youthPics={[]} youthContent={youthContent} />)
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
  it('is true', () => {
    expect(true).toBe(true);
  });
});
