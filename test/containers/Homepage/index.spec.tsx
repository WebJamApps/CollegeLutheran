/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { Homepage } from '../../../src/containers/Homepage';
import WideAboutUs from '../../../src/containers/Homepage/About';
import WideFacebookFeed from '../../../src/containers/Homepage/WideFacebookFeed';
import NarrowFacebookFeed from '../../../src/containers/Homepage/NarrowFacebookFeed';
import PicSlider from '../../../src/components/PicSlider';

const targetRef:any = {};
const wrapper = shallow<Homepage>(<Homepage targetRef={targetRef} width={1000} height={800} />);

describe('Home', () => {
  it('Renders the homepage', () => {
    wrapper.instance().forceUpdate();
    expect(wrapper.find(WideAboutUs).exists()).toBe(true);
    expect(wrapper.find(WideAboutUs).dive().find('div.aboutPage').exists()).toBe(true);
    expect(wrapper.find(WideFacebookFeed).dive()
      .find('div')
      .exists()).toBe(true);
  });
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('Renders WideFacebook when at least 1092', () => {
    const wrapper2 = shallow(<WideFacebookFeed width={1092} />);
    expect(wrapper2.find('p#wideFacebook').prop('style')).toHaveProperty('marginBottom', '32px');
  });
  it('Renders NarrowFacebook with familyPics', () => {
    const allPics:any = {
      title: '', type: '', _id: '', created_at: '',
    };
    const wrapper2 = shallow(<NarrowFacebookFeed allPics={[allPics]} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
  });
  it('Renders WideAbout with familyPics', () => {
    const homeContent: any = '';
    const allPics:any[] = [{
      title: '', type: '', _id: '', created_at: '',
    }];
    const wrapper2 = shallow(<WideAboutUs
      allPics={allPics}
      homeContent={homeContent}
    />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
  });
  it('renders the homepage with cellphone width', () => {
    const wrapper2 = shallow<Homepage>(<Homepage width={320} height={800} targetRef={targetRef} />);
    expect(wrapper2.find(NarrowFacebookFeed).exists()).toBe(true);
  });
});
