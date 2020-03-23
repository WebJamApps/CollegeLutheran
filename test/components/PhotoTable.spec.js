import React from 'react';
import { shallow } from 'enzyme';
import { PhotoTable } from '../../src/components/PhotoTable';

describe('PhotoTable', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      auth: { token: 'token' },
      youthPics: [{
        _id: '456', url: 'url', title: 'title', type: 'youthPics',
      }],
      familyPics: [{
        _id: '789', url: 'url', title: 'title', type: 'familyPics',
      }],
      otherPics: [{
        _id: '999', url: 'url', title: 'title', type: 'otherPics',
      }],
    };
    wrapper = shallow(<PhotoTable
      auth={props.auth}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
    />);
  });
  it('renders correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('sets the columns with customBodyRender', () => {
    expect(typeof wrapper.instance().setColumns).toBe('function');
    wrapper.instance().setColumns();
    const custom = wrapper.instance().state.columns[0].options.customBodyRender('<a href="http://collegelutheran.org/"'
    + ' rel="noopener noreferrer" target="_blank">College Lutheran Church</a>');
    expect(custom.type).toBe('div');
  });
  it('sets the columns with customBodyRender for Modify column', () => {
    expect(typeof wrapper.instance().setColumns).toBe('function');
    wrapper.instance().setColumns();
    const custom = wrapper.instance().state.columns[4].options.customBodyRender('<a href="http://collegelutheran.org/"'
    + ' rel="noopener noreferrer" target="_blank">College Lutheran Church</a>');
    expect(custom.type).toBe('div');
  });
  it('handles click on delete pic button', () => {
    wrapper.instance().deletePic = jest.fn();
    wrapper.update();
    const newArr = wrapper.instance().addThumbs([{ url: 'url', _id: '456' }]);
    const button = shallow(newArr[0].modify);
    button.find('button#deletePic456').simulate('click');
    expect(wrapper.instance().deletePic).toHaveBeenCalled();
  });
  it('runs the deletePic api', async () => {
    wrapper.instance().superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 200 }) }) }));
    wrapper.update();
    global.confirm = jest.fn(() => true);
    delete window.location;
    window.location = {
      href: '/',
      assign: jest.fn(),
      reload: jest.fn(),
    };
    const r = await wrapper.instance().deletePic('456');
    expect(r).toBe(true);
  });
  it('runs the deletePic api but has 304 error', async () => {
    wrapper.instance().superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 304 }) }) }));
    wrapper.update();
    global.confirm = jest.fn(() => true);
    const r = await wrapper.instance().deletePic('456');
    expect(r).toBe(false);
  });
  it('runs the deletePic api but catches error', async () => {
    wrapper.instance().superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    wrapper.update();
    global.confirm = jest.fn(() => true);
    const r = await wrapper.instance().deletePic('456');
    expect(r).toBe(false);
  });
  it('handles cancel on the deletePic api', async () => {
    global.confirm = jest.fn(() => false);
    const r = await wrapper.instance().deletePic('456');
    expect(r).toBe(false);
  });
});
