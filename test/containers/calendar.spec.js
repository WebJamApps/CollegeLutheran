import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../../src/containers/Calendar/index';

function setup() {
  const props = {};
  const wrapper = shallow(<Calendar />);
  return { props, wrapper };
}

describe('Calendar', () => {
  it('Renders the Calendar component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
