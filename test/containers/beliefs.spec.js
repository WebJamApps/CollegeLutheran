import React from 'react';
import { shallow } from 'enzyme';
import Beliefs from '../../src/containers/Beliefs/index';

function setup() {
  const props = {};
  const wrapper = shallow(<Beliefs />);
  return { props, wrapper };
}

describe('Beliefs', () => {
  it('Renders the Beliefs component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
