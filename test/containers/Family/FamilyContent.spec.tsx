/* eslint-disable @typescript-eslint/no-explicit-any */
import renderer from 'react-test-renderer';
import { FamilySlideShow } from 'src/containers/Family/FamilyContent';

describe('FamilyContent', () => {
  it('FamilySlideShow renders correctly with images', () => {
    const familyPics = [{
      type: 'familyPics', _id: '123', url: 'https://test.com', title: 'test',
    }];
    const tree = renderer
      .create(<FamilySlideShow familyPics={familyPics} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
