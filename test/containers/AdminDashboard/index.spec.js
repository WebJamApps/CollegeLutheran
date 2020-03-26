import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from '../../../src/containers/AdminDashboard';

describe('Dashboard Container', () => {
  let props, wrapper;
  beforeEach(() => {
    props = {
      auth: { token: 'token' },
      books: [{ _id: '123' }],
      youthPics: [{ _id: '456' }],
      familyPics: [{ _id: '789' }],
      otherPics: [{ _id: '999' }],
      homeContent: { title: 'title', comments: 'comments' },
    };
    wrapper = shallow(<AdminDashboard
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
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
  it('sets the stateValue on change', () => {
    wrapper.instance().setState = jest.fn();
    wrapper.update();
    wrapper.instance().onChange({ target: {} }, '');
    expect(wrapper.instance().setState).toHaveBeenCalled();
  });
  it('sets the target value on change', () => {
    wrapper.instance().setState = jest.fn();
    wrapper.update();
    wrapper.instance().onChange({ target: { id: 'youthPicsId', value: '456' } });
    expect(wrapper.instance().setState).toHaveBeenCalled();
  });
  it('runs handleEditorChange to set state when entering something into tinymce editor', () => {
    wrapper.instance().setState = jest.fn();
    wrapper.update();
    wrapper.instance().handleEditorChange('hi');
    expect(wrapper.instance().setState).toHaveBeenCalled();
  });
  it('renders with edit pic form', () => {
    const wrapper2 = shallow(<AdminDashboard
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      editPic={{
        title: 'title', url: 'url', type: 'otherPics', _id: '123',
      }}
    />);
    const cpf = wrapper2.instance().changePicForm({ disabled: jest.fn() });
    const d = shallow(cpf);
    const h = d.find('h4').text();
    expect(h).toBe('Edit Pictures');
  });
  it('checks for edit data to set state for edit pictures', () => {
    const wrapper2 = shallow(<AdminDashboard
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      editPic={{
        title: 'title', url: 'url', type: 'otherPics', _id: '123',
      }}
    />);
    wrapper2.instance().setState = jest.fn();
    wrapper2.update();
    wrapper2.instance().checkEdit();
    expect(wrapper2.instance().setState).toHaveBeenCalled();
  });
});
