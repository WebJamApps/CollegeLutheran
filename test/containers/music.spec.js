import React from 'react';
import { shallow } from 'enzyme';
import { Music } from '../../src/containers/Music';

function setup(data) {
  let wrapper;
  if (data !== null && data !== undefined) {
    wrapper = shallow(<Music images={data} />);
  } else wrapper = shallow(<Music />);
  return { wrapper };
}

describe('/music', () => {
  it('renders the component', () => {
    const { wrapper } = setup();
    expect(wrapper.find('div.page-content').exists()).toBe(true);
  });
});
