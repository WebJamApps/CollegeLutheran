/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import About from '../../../src/containers/Homepage/About';

describe('About page', () => {
  const allPics: any[] = [];
  const homeContent: any = { comments: 'booya', title: 'Awesome!' };
  const wrapper = shallow(<About allPics={allPics} width={1000} homeContent={homeContent} />);

  it('Renders the About page', () => {
    expect(wrapper.find('div.aboutPage').exists()).toBe(true);
  });
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
});
