import React from 'react';
import { shallow } from 'enzyme';
import PicSlider from '../../src/components/PicSlider';
import { Music } from '../../src/containers/Music';
import DefaultMusicContent from '../../src/containers/Music/MusicContent';

describe('/music', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Music />);
    expect(wrapper.find(DefaultMusicContent).exists()).toBe(true);
    expect(wrapper.find(DefaultMusicContent).dive().find('div.page-content').exists()).toBe(true);
  });

  it('renders with images', () => new Promise((done) => {
    const data: any[] = [{
      title: '', type: '', _id: '', created_at: '',
    }];
    const wrapper2 = shallow(<DefaultMusicContent musicPics={data} />);
    expect(wrapper2.find(PicSlider).exists()).toBe(true);
    done();
  }));
});
