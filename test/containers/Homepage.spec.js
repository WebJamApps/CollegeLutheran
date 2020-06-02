import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from '../../src/containers/Homepage';
import WideAboutUs from '../../src/containers/Homepage/About';
import WideFacebookFeed from '../../src/containers/Homepage/WideFacebookFeed';
import NarrowFacebookFeed from '../../src/containers/Homepage/NarrowFacebookFeed';
import PicSlider from '../../src/components/PicSlider';

const wrapper = shallow(<Homepage />);

describe('Home', () => {
  it('Renders the homepage', () => {
    wrapper.instance().setState({ width: 1009 });
    wrapper.instance().forceUpdate();
    expect(wrapper.find(WideAboutUs).exists()).toBe(true);
    expect(wrapper.find(WideAboutUs).dive().find('div.widescreenHomepage').exists()).toBe(true);
    expect(wrapper.find(WideFacebookFeed).dive()
      .find('div')
      .exists()).toBe(true);
  });
  it('Resizes the page', () => {
    wrapper.instance().onResize(100);
    expect(wrapper.instance().state.width).toBe(100);
  });
  it('Renders WideFacebook when at least 1092', () => {
    const wrapper2 = shallow(<WideFacebookFeed width={1092} />);
    expect(wrapper2.find('p#wideFacebook').prop('style')).toHaveProperty('marginBottom', '32px');
  });
  it('Renders NarrowFacebook with familyPics', () => {
    const wrapper2 = shallow(<NarrowFacebookFeed allPics={[{}]} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
  });
  it('Renders WideAbout with familyPics', () => {
    const wrapper2 = shallow(<WideAboutUs allPics={[{}]} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
  });
});
