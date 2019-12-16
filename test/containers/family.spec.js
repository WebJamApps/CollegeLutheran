import React from 'react';
import { shallow } from 'enzyme';
import Family from '../../src/containers/Family/index';

function setup() {
  const props = {};
  const wrapper = shallow(<Family />);
  return { props, wrapper };
}

describe('Family', () => {
  it('Renders the Family component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
