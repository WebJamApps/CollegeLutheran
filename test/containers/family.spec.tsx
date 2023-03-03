/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import PicSlider from 'src/components/PicSlider';
import FamilyContent from 'src/containers/Family/FamilyContent';
import { Family } from '../../src/containers/Family/index';

describe('Family', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Family />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
