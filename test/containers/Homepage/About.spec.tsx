import {
  About, shuffle, Col, IAbout,
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
  it('renders PicSlider', () => {
    const data = {
      title: 'pic1', _id: 'a', type: 'any',
    };
    const width = { width: 900 } as IAbout;
    const result: any = renderer.create(<Col {...width} data={[data]} />).toJSON();
    expect(result.children[0].props.id.includes('familySlideshowWide')).toBe(true);
  });
  it('returns title of homeContent', () => {
    const props = {
      homeContent: { title: '', _id: '', type: 'homeContent' },
      width: 1,
    };
    const about: any = renderer.create(<About {...props} />).toJSON();
    console.log(about.children[0].children[0].children[0].children[1].props);
    expect(about.children[0].children[0].children[0].includes('title')).toBe(true);
  });
});
