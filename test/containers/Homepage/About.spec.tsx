import {
  About, shuffle, PictureSection, IAbout,
} from 'src/containers/Homepage/About';
import type { Ipicture } from 'src/Providers/PicsProvider';
import renderer from 'react-test-renderer';

describe('About', () => {
  it('shuffles pictures randomly', () => {
    const arr = [{ title: '', _id: 'a', type: '' },
      { title: '', _id: 'b', type: '' },
      { title: '', _id: 'c', type: '' },
      { title: '', _id: 'd', type: '' }] as Ipicture[];
    const result = shuffle(arr);
    expect(result[0]._id === 'a' || result[0]._id === 'b' || result[0]._id === 'c' || result[0]._id === 'd').toBe(true);
    expect(result[1]._id === 'a' || result[1]._id === 'b' || result[1]._id === 'c' || result[1]._id === 'd').toBe(true);
    expect(result[2]._id === 'a' || result[2]._id === 'b' || result[2]._id === 'c' || result[2]._id === 'd').toBe(true);
    expect(result[3]._id === 'a' || result[3]._id === 'b' || result[3]._id === 'c' || result[3]._id === 'd').toBe(true);
  });
});
