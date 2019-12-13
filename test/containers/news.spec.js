import React from 'react';
import { shallow } from 'enzyme';
import News from '../../src/containers/News/index';

function setup() {
  const props = {};
  const wrapper = shallow(<News />);
  return { props, wrapper };
}

describe('News', () => {
  it('Renders the News component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
