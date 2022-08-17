/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminController from '../../../src/containers/AdminDashboard/AdminController';

describe('AdminController', () => {
  let r: any, controller: any,
    vStub: { setState: jest.Mock<any, any>;
      forms: { makeDropdown: () => any; makeInput:()=>any };
      state: { title: string; homePageContent: string; youthURL: string; type: string; addAdminEmail: string, formError: string };
      props: { auth: { token: string; }; editPic: any; dispatch: (fun: any) => any; }; };
  beforeEach(() => {
    vStub = {
      setState: jest.fn(),
      forms: { makeDropdown: () => null, makeInput: jest.fn() },
      state: {
        title: 'Exciting News!',
        homePageContent: 'Lots of stuff here!',
        youthURL: 'url',
        type: 'youthPics',
        addAdminEmail: 'test@gmail.com',
        formError: '',
      },
      props: {
        auth: { token: 'token' }, editPic: {}, dispatch: (fun) => fun,
      },
    };
    controller = new AdminController(vStub as any);
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
    jest.mock('react-notifications-component');
    const { store } = jest.requireActual('react-notifications-component');
    expect(store.addNotification).toBeDefined();
    Object.defineProperty(store, 'addNotification', {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        addNotification: jest.fn(),
      })),
    });
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
  // it('sends an create pic request to the backend', async () => {
  //   controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 201 }) }) }) }));
  //   Object.defineProperty(window, 'location', { value: { assign: () => { } }, writable: true });
  //   window.location.assign = jest.fn();
  //   r = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
  //   expect(r).toBe('201');
  //   expect(window.location.assign).toHaveBeenCalled();
  // });
  // it('catches error when sends create pic request to the backend', async () => {
  //   controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
  //   const res = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
  //   expect(res).toBe('bad');
  // });
  // it('handles 300 res from sending create pic request to the backend', async () => {
  //   controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
  //   r = await controller.createPicApi({ preventDefault: () => { } }, {}, '/youth');
  //   expect(r).toBe('Did not create book');
  // });
  // it('sends an edit pic request to the backend', async () => {
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 200 }) }) }) }));
  //   Object.defineProperty(window, 'location', { value: { reload: () => { } }, writable: true });
  //   window.location.reload = jest.fn();
  //   r = await controller.editPicAPI({ preventDefault: () => { } });
  //   expect(r).toBe(true);
  //   expect(window.location.reload).toHaveBeenCalled();
  // });
  // it('catches error when sends edit pic request to the backend', async () => {
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
  //   r = await controller.editPicAPI({ preventDefault: () => { } });
  //   expect(r).toBe(false);
  // });
  // it('handles 300 res from sending edit pic request to the backend', async () => {
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 300 }) }) }) }));
  //   r = await controller.editPicAPI({ preventDefault: () => { } });
  //   expect(r).toBe(false);
  // });
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
  it('handles change within the tinymce editor', () => {
    r = controller.handleEditorChange('howdy');
    expect(r).toBe('howdy');
  });
  it('validates book when not firstEdit', () => {
    const dis = controller.validateBook(' ', ' ', ' ', false);
    expect(dis).toBe(false);
  });
  it('catches error when sends an add admin request to the backend', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
    const res = await controller.addAdminUser({ preventDefault: () => { } });
    expect(res).toBe(false);
  });
  it('Sends 400 res when user doesnt exist', async () => {
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 400 }) }) }) }));
    r = await controller.addAdminUser({ preventDefault: () => { } });
    expect(r).toBe(true);
  });
  it('Returns non-admin user', async () => {
    const returnBody: Record<string, unknown> = { body: { _id: '1', userType: 'Test' } };
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve(returnBody) }) }) }));
    const res = await controller.addAdminUser({ preventDefault: () => { } });
    expect(res).toBe(true);
  });
  // eslint-disable-next-line jest/no-commented-out-tests
  it('Returns admin user', async () => {
    let authRole = '';
    // eslint-disable-next-line prefer-destructuring
    if (process.env.userRoles) authRole = JSON.parse(process.env.userRoles).roles[0];
    const returnBody: Record<string, unknown> = { body: { _id: '1', userType: authRole } };
    controller.superagent.post = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve(returnBody) }) }) }));
    const res = await controller.addAdminUser({ preventDefault: () => { } });
    expect(res).toBe(false);
  });
  // it('putAPI successfully sends PUT rest call', async () => {
  //   const returnBody: Record<string, unknown> = { body: { _id: '1' }, status: 200 };
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve(returnBody) }) }) }));
  //   const result = await controller.putAPI({ preventDefault: () => {} }, { title: '', comments: '' }, '');
  //   expect(result).toBe('200');
  // });
  // it('putAPI unsuccessful PUT rest call', async () => {
  //   const returnBody: Record<string, unknown> = { body: { _id: '1' }, status: 400 };
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.resolve(returnBody) }) }) }));
  //   const result = await controller.putAPI({ preventDefault: () => {} }, { title: '', comments: '' }, '/');
  //   expect(result).toBe('Failed to update / page.');
  // });
  // it('putAPI error when PUT rest call', async () => {
  //   controller.superagent.put = jest.fn(() => ({ set: () => ({ set: () => ({ send: () => Promise.reject(new Error('bad')) }) }) }));
  //   const result = await controller.putAPI({ preventDefault: () => {} }, { title: '', comments: '' }, '/');
  //   expect(result).toBe('bad');
  // });
  it('onChangeYouthContent', () => {
    expect(controller.onChangeYouthContent('howdy')).toBe('howdy');
  });
  it('makes tiny editor with onchange defined', () => {
    const result = controller.editor('', () => {});
    expect(typeof result.type).toBe('function');
  });
  it('validateAdmin when valid', () => {
    expect(controller.validateAdmin()).toBe(false);
  });
  it('validateAdmin when invalid', () => {
    controller.view.state.addAdminEmail = 'j@yahoo.com';
    expect(controller.validateAdmin()).toBe(true);
  });
  it('handles uncheck for isworshipbulletin', () => {
    const newsForm = controller.createNews({}, {}, 'worshipbulletin', '', '');
    expect(newsForm.props.id).toBe('create-forum');
  });
});
