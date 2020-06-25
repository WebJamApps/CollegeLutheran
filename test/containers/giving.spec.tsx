import React from 'react';
import { shallow } from 'enzyme';
import Giving from '../../src/containers/Giving/index';
import DefaultGivingContent from '../../src/containers/Giving/GivingContent';

function setup() {
  const props = {};
  const wrapper = shallow(<Giving />);
  return { props, wrapper };
}

describe('Giving', () => {
  it('Renders the Giving component', () => {
    const { wrapper } = setup();
    expect(wrapper.find(DefaultGivingContent)
      .dive()
      .find('div.page-content')
      .exists()).toBe(true);
  });
});
