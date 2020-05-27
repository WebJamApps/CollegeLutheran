import { shallow } from 'enzyme';
import AdminController from '../../../src/containers/AdminDashboard/AdminController';

describe('AdminController', () => {
  let r, controller, vStub;
  beforeEach(() => {
    vStub = {
      setState: jest.fn(),
      forms: { makeDropdown: () => null },
      state: {
        title: 'Exciting News!', homePageContent: 'Lots of stuff here!', youthURL: 'url', type: 'youthPics',
      },
      props: { auth: { token: 'token' }, editPic: {}, dispatch: (fun) => fun },
    };
    controller = new AdminController(vStub);
  });
  it('sends a delete book request to the backend', async () => {
    controller.superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 200 }) }) }));
    Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
    window.location.assign = jest.fn();
    global.confirm = jest.fn(() => true);
    r = await controller.deleteBookApi({ preventDefault: () => { } }, '123', '/news');
    expect(r).toBe(true);
    expect(window.location.assign).toHaveBeenCalled();
  });
  it('catches error on delete book request to the backend', async () => {
    global.confirm = jest.fn(() => true);
    controller.superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.reject(new Error('bad')) }) }));
    r = await controller.deleteBookApi({ preventDefault: () => { } }, '123', '/news');
    expect(r).toBe(false);
  });
  it('handles 300 responses from sending delete book request to the backend', async () => {
    global.confirm = jest.fn(() => true);
    controller.superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 300 }) }) }));
    r = await controller.deleteBookApi({ preventDefault: () => { } }, '123', '/news');
    expect(r).toBe(false);
  });
  it('handles cancel sending delete book request to the backend', async () => {
    global.confirm = jest.fn(() => false);
    controller.superagent.delete = jest.fn(() => ({ set: () => ({ set: () => Promise.resolve({ status: 300 }) }) }));
    r = await controller.deleteBookApi({ preventDefault: () => { } }, '123', '/news');
    expect(r).toBe(false);
  });
  it('sends an update homepage request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 200 }) }) }) }));
    Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
    window.location.assign = jest.fn();
    r = await controller.createHomeAPI({ preventDefault: () => { } });
    expect(r).toBe(true);
    expect(window.location.assign).toHaveBeenCalled();
  });
  it('catches error when sends an update homepage request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    r = await controller.createHomeAPI({ preventDefault: () => { } });
    expect(r).toBe(false);
  });
  it('handles 300 res from sending an update homepage request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
    r = await controller.createHomeAPI({ preventDefault: () => { } });
    expect(r).toBe(false);
  });
  it('sends an create pic request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 201 }) }) }) }));
    Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
    window.location.assign = jest.fn();
    r = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
    expect(r).toBe(true);
    expect(window.location.assign).toHaveBeenCalled();
  });
  it('catches error when sends create pic request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    r = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
    expect(r).toBe(false);
  });
  it('handles 300 res from sending create pic request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
    r = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
    expect(r).toBe(false);
  });
  it('sends an edit pic request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 200 }) }) }) }));
    Object.defineProperty(window, 'location', { value: { reload: () => { } }, writable: true });
    window.location.reload = jest.fn();
    r = await controller.editPicAPI({ preventDefault: () => { } });
    expect(r).toBe(true);
    expect(window.location.reload).toHaveBeenCalled();
  });
  it('catches error when sends edit pic request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    r = await controller.editPicAPI({ preventDefault: () => { } });
    expect(r).toBe(false);
  });
  it('handles 300 res from sending edit pic request to the backend', async () => {
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
    r = await controller.editPicAPI({ preventDefault: () => { } });
    expect(r).toBe(false);
  });
  it('sends an add forum request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 201 }) }) }) }));
    Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
    window.location.assign = jest.fn();
    r = await controller.addForumAPI({ preventDefault: () => { } });
    expect(r).toBe(true);
    expect(window.location.assign).toHaveBeenCalled();
  });
  it('catches error when sends add forum request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    r = await controller.addForumAPI({ preventDefault: () => { } }, {}, '/youth');
    expect(r).toBe(false);
  });
  it('handles 300 res from sending add forum request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
    r = await controller.addForumAPI({ preventDefault: () => { } }, {}, '/youth');
    expect(r).toBe(false);
  });
  it('handles click to delete a picture', () => {
    controller.deleteBookApi = jest.fn();
    const f = shallow(controller.deleteBookForm('id', 'label', '123', [], '/youth'));
    f.find('button').simulate('click');
    expect(controller.deleteBookApi).toHaveBeenCalled();
  });
  it('handles change within the tinymce editor', () => {
    r = controller.handleEditorChange('howdy');
    expect(r).toBe(true);
  });
  it('validates book when not firstEdit', () => {
    const dis = controller.validateBook(' ', ' ', ' ', false);
    expect(dis).toBe(false);
  });
});
