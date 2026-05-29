/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import { FamilySlideShow } from 'src/containers/Family/FamilyContent';

describe('FamilyContent', () => {
  it('FamilySlideShow renders correctly with images', () => {
    const familyPics = [{
      type: 'familyPics', _id: '123', url: 'https://test.com', title: 'test',
    }];
    const tree = render(<FamilySlideShow familyPics={familyPics} />).container;
    expect(tree).toMatchSnapshot();
  });
});
