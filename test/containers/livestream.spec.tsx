/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import LiveStream from '../../src/containers/LiveStream/index';

function setup() {
  const wrapper = shallow(<LiveStream />);
  return { wrapper };
}

describe('Livestream', () => {
  it('Renders the LiveStream component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.livestream').exists()).toBe(true);
  });
});
