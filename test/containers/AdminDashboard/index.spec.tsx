import React from 'react';
import { shallow } from 'enzyme';
import { AdminDashboard } from '../../../src/containers/AdminDashboard';
import PTable from '../../../src/components/PhotoTable';

describe('Dashboard Container', () => {
  let props: any, wrapper: any;
  const history: any = {};
  const location: any = {};
  const match: any = {};
  beforeEach(() => {
    props = {
      auth: { token: 'token' },
      books: [{ _id: '123' }],
      youthPics: [{ _id: '456' }],
      familyPics: [{ _id: '789' }],
      otherPics: [{ _id: '999' }],
      homeContent: { title: 'title', comments: 'comments' },
    };
    wrapper = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      auth={props.auth}
      books={props.books}
      homeContent={props.homeContent}
      showTable
      editPic={{}}
      history={history}
      location={location}
      match={match}
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
    const result = wrapper.instance().onChange({ target: {} }, 'stateValue');
    expect(result).toBe('stateValue');
  });
  it('uses the event target id on change', () => {
    const result = wrapper.instance().onChange({ target: { id: 'youthPicsId', value: '456' } });
    expect(result).toBe('youthPicsId');
  });
  it('renders with edit pic form', () => {
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      showTable
      auth={props.auth}
      books={props.books}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      editPic={{
        title: 'title', url: 'url', type: 'otherPics', _id: '123',
      }}
      history={history}
      location={location}
      match={match}
    />);
    wrapper2.instance().setState = jest.fn();
    const cpf = wrapper2.instance().changePicForm({ disabled: jest.fn() });
    const d = shallow(cpf);
    const h = d.find('h4').text();
    expect(h).toBe('Edit Pictures');
  });
  it('checks for edit data to set state for edit pictures', () => {
    const wrapper2 = shallow<AdminDashboard>(<AdminDashboard
      dispatch={(fun) => fun}
      showTable
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      editPic={{
        title: 'title', url: 'url', type: 'otherPics', _id: '123', comments: 'showCaption',
      }}
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
    const wrapper2 = shallow(<AdminDashboard
      dispatch={(fun) => fun}
      auth={props.auth}
      books={props.books}
      youthPics={props.youthPics}
      familyPics={props.familyPics}
      otherPics={props.otherPics}
      homeContent={props.homeContent}
      editPic={{
        title: 'title', url: 'url', type: 'otherPics', _id: '123', comments: 'showCaption',
      }}
      showTable={false}
      history={history}
      location={location}
      match={match}
    />);
    expect(wrapper2.find(<PTable />).exists()).toBe(false);
  });
});
