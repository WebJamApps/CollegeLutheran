import React from 'react';
import { shallow } from 'enzyme';
import { Youth } from '../../src/containers/Youth/index';
import DefaultYouthContent from '../../src/containers/Youth/YouthContent';
import PicSlider from '../../src/components/PicSlider';

function setup(data) {
  let wrapper;
  if (data !== null && data !== undefined) {
    wrapper = shallow(<Youth youthPics={data} />);
  } else wrapper = shallow(<Youth />);
  return { wrapper };
}

describe('Youth', () => {
  it('Renders the Youth component', () => {
    const data = [{}];
    const { wrapper } = setup(data);
    expect(wrapper.find(DefaultYouthContent).exists()).toBe(true);
    expect(wrapper.find(DefaultYouthContent).dive().find('div.page-content').exists()).toBe(true);
  });
  it('renders with images', () => new Promise((done) => {
    const data = [{}];
    const wrapper2 = shallow(<DefaultYouthContent youthPics={data} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
    done();
  }));
});
