/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from '../../../src/containers/AdminDashboard';
import { PhotoTable } from '../../../src/components/PhotoTable';

describe('Dashboard Container', () => {
  let props: any, wrapper: any;
  const history: any = {};
  const location: any = {};
  const match: any = {};
  const editPic:any = {
    title: '', _id: '', type: '', created_at: '',
  };
  beforeEach(() => {
    props = {
      auth: { token: 'token' },
      books: [{ _id: '123' }],
      youthPics: [{ _id: '456' }],
      familyPics: [{ _id: '789' }],
      otherPics: [{ _id: '999' }],
      homeContent: { title: '', comments: '' },
    };
    wrapper = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      auth={props.auth}
      books={props.books}
      homeContent={props.homeContent}
      showTable
      editPic={editPic}
      history={history}
      location={location}
      match={match}
      youthPics={[]}
      familyPics={[]}
      otherPics={[]}
      musicPics={[]}
    />);
  });
  it('renders correctly', () => { expect(wrapper).toMatchSnapshot(); });
  it('handles click to delete a forum', () => {
    wrapper.instance().controller.deleteBookApi = jest.fn();
    wrapper.update();
    const form = wrapper.instance().deleteForumForm('id', []);
    const f = shallow(form);
    f.find('button').simulate('click');
    expect(wrapper.instance().controller.deleteBookApi).toHaveBeenCalled();
  });
  it('handles click to create youth pic', () => {
    wrapper.instance().controller.createPicApi = jest.fn();
    wrapper.update();
    wrapper.instance().setState({ youthName: 'name', youthURL: 'url', type: 'youthPics' });
    const form = wrapper.instance().changeYouthForm();
    const f = shallow(form);
    const createForm = f.find('form').get(0);
    const button = shallow(createForm);
    button.find('button#addYouthPic').simulate('click');
    expect(wrapper.instance().controller.createPicApi).toHaveBeenCalled();
  });
  it('uses the stateValue on change', () => {
    const result = wrapper.instance().onChange({ persist: jest.fn(), target: {} }, 'stateValue');
    expect(result).toBe('stateValue');
  });
  it('uses the stateValue on selectChange', () => {
    const result = wrapper.instance().onChangeSelect({ persist: jest.fn(), target: {} }, 'stateValue');
    expect(result).toBe('stateValue');
  });
  it('uses the event target id on change', () => {
    const result = wrapper.instance().onChange({ persist: jest.fn(), target: { id: 'youthPicsId', value: '456' } });
    expect(result).toBe('youthPicsId');
  });
  it('uses the event target id on changeSelect', () => {
    const result = wrapper.instance().onChangeSelect({ persist: jest.fn(), target: { id: 'youthPicsId', value: '456' } });
    expect(result).toBe('youthPicsId');
  });
  it('renders with edit pic form', () => {
    const editPic2:any = {
      title: '', url: 'url', type: 'otherPics', _id: '123', created_at: '',
    };
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      showTable
      auth={props.auth}
      books={props.books}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      youthPics={props.youthPics}
      musicPics={props.musicPics}
      editPic={editPic2}
      history={history}
      location={location}
      match={match}
    />);
    wrapper2.instance().setState = jest.fn();
    const cpf = wrapper2.instance().changePicForm({
      buttonId: '', buttonClick: jest.fn(), title: '', nameId: '',
    });
    const d = shallow(cpf);
    const h = d.find('h4').text();
    expect(h).toBe('Edit Pictures');
  });
  it('checks for edit data to set state for edit pictures', () => {
    const editPic2:any = {
      title: 'title', url: 'url', type: 'otherPics', _id: '123', comments: 'showCaption', created_at: '',
    };
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      showTable
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      musicPics={props.musicPics}
      homeContent={props.homeContent}
      editPic={editPic2}
      history={history}
      location={location}
      match={match}
    />);
    wrapper2.instance().setState = jest.fn();
    wrapper2.update();
    wrapper2.instance().checkEdit();
    expect(wrapper2.instance().setState).toHaveBeenCalled();
  });
  it('checks for edit data to set state when not edit pictures', () => {
    const editPic2: any = {};
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      showTable
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      musicPics={props.musicPics}
      homeContent={props.homeContent}
      editPic={editPic2}
      history={history}
      location={location}
      match={match}
    />);
    wrapper2.instance().setState = jest.fn();
    wrapper2.update();
    wrapper2.instance().checkEdit();
    expect(wrapper2.instance().setState).toHaveBeenCalled();
  });
  it('sets state from a radio button change', () => {
    // eslint-disable-next-line jest/no-conditional-expect
    wrapper.instance().setState = jest.fn((obj) => { if (obj.showCaption) expect(obj.showCaption).toBe('showCaption'); });
    wrapper.update();
    wrapper.instance().handleRadioChange({ target: { value: 'showCaption' } });
  });
  it('resets the edit pic form', () => {
    wrapper.instance().setState = jest.fn((obj) => expect(obj.youthName).toBe(''));
    wrapper.update();
    wrapper.instance().resetEditForm({ preventDefault: () => { } });
  });
  it('doesnt show PTable when showTable is true', () => {
    const editPic2:any = {
      title: 'title', url: 'url', type: 'otherPics', _id: '123', comments: 'showCaption', created_at: '',
    };
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      musicPics={props.musicPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent || ''}
      editPic={editPic2}
      showTable={false}
      history={history}
      location={location}
      match={match}
    />);
    expect(wrapper2.find(PhotoTable).exists()).toBe(false);
  });
});
