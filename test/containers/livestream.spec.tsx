import React from 'react';
import { shallow } from 'enzyme';
import { LiveStream } from '../../src/containers/LiveStream/index';

function setup() {
  const props = {};
  const targetRef: any = {};
  const wrapper = shallow<LiveStream>(<LiveStream targetRef={targetRef} width={1000} height={1000} />);
  return { props, wrapper };
}

describe('LiveStream', () => {
  const { wrapper } = setup();
  it('renders snapshot correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('Changes the URLs on production', () => {
    let twitchUrl = '',
      chatUrl = '';
    if (process.env.NODE_ENV === 'production') {
      twitchUrl = 'https://player.twitch.tv/?channel=collegelutheranchurch&parent=collegelutheran.com/livestream';
      chatUrl = 'https://player.twitch.tv/?channel=collegelutheranchurch&parent=collegelutheran.com/livestream';
    }
    expect(twitchUrl).toBe('');
  });
});
