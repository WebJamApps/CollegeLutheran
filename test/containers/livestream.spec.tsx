import React from 'react';
import { shallow } from 'enzyme';
import DefaultLiveStream, { LiveStream } from '../../src/containers/LiveStream/index';

describe('LiveStream', () => {
  const wrapper = shallow(<DefaultLiveStream />);
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('handles widescreen width', () => {
    const result = LiveStream({ width: 932, height: 400 });
    expect(result.props.children[0]).not.toBe(null);
  });
  it('handles smaller screen width', () => {
    const result = LiveStream({ width: 931, height: 400 });
    expect(result.props.children[0]).toBe(null);
  });
});
