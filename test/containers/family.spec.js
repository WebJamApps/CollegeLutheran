import React from 'react';
import { shallow } from 'enzyme';
import { Family } from '../../src/containers/Family/index';
import DefaultFamilyContent from '../../src/containers/Family/FamilyContent';

function setup() {
  // const data = [
  //   { _id: 1, comments: '../static/imgs/ohaf/slideshow2.png' },
  //   { _id: 2, comments: '../static/imgs/ohaf/slideshow3.png' },
  //   { _id: 3, comments: '../static/imgs/ohaf/slideshow4.png' },
  //   { _id: 4, comments: '../static/imgs/ohaf/slideshow5.png' },
  //   { _id: 5, comments: '../static/imgs/ohaf/slideshow6.png' },
  // ];
  const props = { };
  const wrapper = shallow(<Family />);
  return { props, wrapper };
}

describe('Family', () => {
  it('Renders the Family component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(DefaultFamilyContent).exists()).toBe(true);
    // expect(wrapper.find(DefaultFamilyContent).dive().find('div.page-content').exists()).toBe(true);
  });
});
