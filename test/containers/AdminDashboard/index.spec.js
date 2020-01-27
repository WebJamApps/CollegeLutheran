/* eslint-disable jest/no-commented-out-tests */
import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from '../../../src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  function setup() {
    const auth = { token: '' };
    const props = { auth };
    const wrapper = shallow(<AdminDashboard auth={auth} books={[]} />);
    return { props, wrapper };
  }
  it('is defined', () => {
    expect(AdminDashboard).toBeDefined();
  });
  it('renders correctly', () => {
    const { wrapper } = setup();
    expect(wrapper).toMatchSnapshot();
  });
  it('calls on change', () => {
    const { wrapper } = setup();
    wrapper.instance().setState = jest.fn((boobyJ) => { expect(boobyJ.hi).toBe(11); });
    wrapper.instance().onChange({ preventDefault: () => {}, target: { id: 'hi', value: 11 } });
  });
  // it('catches error when posting home content to backend', async () => {
  //   const { wrapper } = setup();
  //   wrapper.instance().superagent.post = jest.fn(() => ({ set: () => ({ send: () => Promise.resolve(new Error('bad')) }) }));
  //   wrapper.update();
  //   wrapper.setState({
  //     title: 'New Stuff',
  //     homePageContent: 'All this awesome new content!',
  //   });
  //   await expect(wrapper.instance().createHome()).rejects.toThrow('bad');
  // });
  // it('creates a new youth pic', async () => {
  //  const { wrapper } = setup();
  //   wrapper.instance().superagent.post = jest.fn(() => ({ set: () => ({ send: () => Promise.resolve({ status: 201 }) }) }));
  //   wrapper.update();
  //   wrapper.setState({
  //     youthName: 'Some Youngin',
  //     youthURL: 'https://www.example.com/totallyapic.png',
  //   });
  //   const result = await wrapper.instance().createYouthApi();
  //   expect(result).toBe(201);
  // });
  // it('creates a new homepage content', async () => {
  //  const { wrapper } = setup();
  //   wrapper.instance().superagent.post = jest.fn(() => ({ set: () => ({ send: () => Promise.resolve({ status: 200 }) }) }));
  //   wrapper.update();
  //   wrapper.setState({
  //     title: 'New Stuff',
  //     homePageContent: 'All this awesome new content!',
  //   });
  //   const result = await wrapper.instance().createHome();
  //   expect(result).toBe(200);
  // });
});
