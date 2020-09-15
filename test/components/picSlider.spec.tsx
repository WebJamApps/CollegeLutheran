/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import PicSlider from '../../src/components/PicSlider';

const data:any[] = [
  { _id: 1, url: '../static/imgs/ohaf/slideshow2.png', comments: 'showCaption' },
  { _id: 2, url: '../static/imgs/ohaf/slideshow3.png' },
  { _id: 3, url: '../static/imgs/ohaf/slideshow4.png' },
  { _id: 4, url: '../static/imgs/ohaf/slideshow5.png' },
  { _id: 5, url: '../static/imgs/ohaf/slideshow6.png' },
];

const wrapper = shallow(<PicSlider data={data} />);

describe('picture slider component test', () => {
  it('renders the component', () => {
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.find('Caption').first().dive().find('.slider-caption')
      .exists()).toBe(true);
  });
});
