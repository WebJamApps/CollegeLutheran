import React from 'react';
import { shallow } from 'enzyme';
import DefaultYouth from '../../src/containers/Youth/index';

function setup() {
  const props = {};
  const wrapper = shallow(<DefaultYouth />);
  return { props, wrapper };
}

describe('Youth', () => {
  it('Renders the Youth component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
