/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import {
  About, shuffle, PictureSection,
} from 'src/containers/Homepage/About';
import type { Ibook } from 'src/providers/utils';

describe('About', () => {
  it('shuffles pictures randomly', () => {
    const arr = [{ title: '', _id: 'a', type: '' },
      { title: '', _id: 'b', type: '' },
      { title: '', _id: 'c', type: '' },
      { title: '', _id: 'd', type: '' }] as Ibook[];
    const ids = new Set(['a', 'b', 'c', 'd']);
    const result = shuffle(arr);
    result.forEach((r) => expect(ids.has(r._id)).toBe(true));
  });
  it('renders PicSlider on right column when width > 900', () => {
    const data = { title: 'pic', _id: '1', type: 'any' };
    const { container } = render(<PictureSection data={[data]} width={900} />);
    expect(container.querySelector('[id^="pic-slider"]')).not.toBeNull();
  });
  it('renders PicSlider on bottom of page', () => {
    const { container } = render(<PictureSection data={[]} width={900} />);
    expect(container.querySelector('#slideshow1')).not.toBeNull();
  });
  it('PicSlider returns empty when data has no title', () => {
    const data = { title: '', _id: '', type: '' };
    const { container } = render(<PictureSection data={[data]} />);
    expect(container.textContent?.trim()).toBe('');
  });
  it('renders the about page', () => {
    const props = { homePage: { title: '', _id: '', type: '' }, width: 900 };
    const { container } = render(<About {...props} />);
    expect(container).toMatchSnapshot();
  });
});
