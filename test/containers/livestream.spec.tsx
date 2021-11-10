import React from 'react';
import { shallow } from 'enzyme';
import DefaultLiveStream, { LiveStream } from '../../src/containers/LiveStream/index';

describe('LiveStream', () => {
  const wrapper = shallow(<DefaultLiveStream />);
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('handles widescreen width', () => {
    const result = LiveStream({ width: 932, height: 400 });
    expect(result.props.children[2]).toBe(null);
  });
  it('handles smaller screen width', () => {
    const result = LiveStream({ width: 931, height: 400 });
    expect(result.props.children[2]).not.toBe(null);
  });
  it('handles middle screen width', () => {
    const result = LiveStream({ width: 769, height: 400 });
    console.log(result.props.children[3]);
    expect(result.props.children[3].props.style.marginTop).toBe('34vh');
  });
  it('handles cellphone screen width', () => {
    const result = LiveStream({ width: 600, height: 400 });
    expect(result.props.children[3].props.style.marginTop).toBe('38vh');
  });
});
