/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { Family } from '../../src/containers/Family/index';
import DefaultFamilyContent from '../../src/containers/Family/FamilyContent';

describe('Family', () => {
  it('renders correctly without images', () => {
    const tree = renderer
      .create(<Family familyPics={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
