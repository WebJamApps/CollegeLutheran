import React from 'react';
import { shallow } from 'enzyme';
import Staff from '../../src/containers/Staff/index';

function setup() {
  const props = {};
  const wrapper = shallow(<Staff />);
  return { props, wrapper };
}

describe('Staff', () => {
  it('Renders the Staff component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
