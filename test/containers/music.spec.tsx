import React from 'react';
import { shallow } from 'enzyme';
import Music from '../../src/containers/Music';
import DefaultMusicContent from '../../src/containers/Music/MusicContent';

describe('/music', () => {
  it('renders the component', () => {
    const wrapper = shallow(<Music />);
    expect(wrapper.find(DefaultMusicContent).exists()).toBe(true);
    expect(wrapper.find(DefaultMusicContent).dive().find('div.page-content').exists()).toBe(true);
  });
});
