import {
  About, shuffle, PictureSection,
} from 'src/containers/Homepage/About';
import renderer from 'react-test-renderer';
import type { Ibook } from 'src/providers/utils';

describe('About', () => {
  it('shuffles pictures randomly', () => {
    const arr = [{ title: '', _id: 'a', type: '' },
      { title: '', _id: 'b', type: '' },
      { title: '', _id: 'c', type: '' },
      { title: '', _id: 'd', type: '' }] as Ibook[];
    const result = shuffle(arr);
    expect(result[0]._id === 'a' || result[0]._id === 'b' || result[0]._id === 'c' || result[0]._id === 'd').toBe(true);
    expect(result[1]._id === 'a' || result[1]._id === 'b' || result[1]._id === 'c' || result[1]._id === 'd').toBe(true);
    expect(result[2]._id === 'a' || result[2]._id === 'b' || result[2]._id === 'c' || result[2]._id === 'd').toBe(true);
    expect(result[3]._id === 'a' || result[3]._id === 'b' || result[3]._id === 'c' || result[3]._id === 'd').toBe(true);
  });
  it('renders PicSlider on right column when width > 900', () => {
    const data = {
      title: 'pic', _id: '1', type: 'any',
    };
    const width = 900;
    const result: any = renderer.create(<PictureSection data={[data]} width={width} />).toJSON();
    expect(result.children[0].children[0].props.id.includes('pic-slider')).toBe(true);
  });
  it('renders PicSlider on bottom of page', () => {
    const width = 900;
    const result: any = renderer.create(<PictureSection data={[]} width={width} />).toJSON();
    expect(result.children[0].props.id.includes('slideshow1')).toBe(true);
  });
  it('PicSlider returns empty', () => {
    const data = {
      title: '', _id: '', type: '',
    };
    const result: any = renderer.create(<PictureSection data={[data]} />).toJSON();
    expect(result).toBe(' ');
  });
  it('renders the about page', () => {
    const props = { homePage: { title: '', _id: '', type: '' }, width: 900 };
    const about: any = renderer.create(<About {...props} />).toJSON();
    expect(about).toMatchSnapshot();
  });
});
