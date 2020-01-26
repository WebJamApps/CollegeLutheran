import React from 'react';
import { shallow } from 'enzyme';
import { Family } from '../../src/containers/Family/index';
import DefaultFamilyContent from '../../src/containers/Family/FamilyContent';

function setup(data) {
  let wrapper;
  if (data !== null && data !== undefined) {
    wrapper = shallow(<Family familyPics={data} />);
  } else wrapper = shallow(<Family />);
  return { wrapper };
}

describe('Family', () => {
  it('Renders the Family component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(DefaultFamilyContent).exists()).toBe(true);
    expect(wrapper.find(DefaultFamilyContent).dive().find('div.page-content').exists()).toBe(true);
  });
});
