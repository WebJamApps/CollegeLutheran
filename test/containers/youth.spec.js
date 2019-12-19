import React from 'react';
import { shallow } from 'enzyme';
import Youth from '../../src/containers/Youth/index';

function setup() {
  const props = {};
  const wrapper = shallow(<Youth />);
  return { props, wrapper };
}

describe('Youth', () => {
  it('Renders the Youth component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
