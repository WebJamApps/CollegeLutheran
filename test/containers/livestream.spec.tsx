import React from 'react';
import { shallow } from 'enzyme';
import DefaultLiveStream from '../../src/containers/LiveStream/index';

describe('LiveStream', () => {
  const wrapper = shallow(<DefaultLiveStream />);
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
});
