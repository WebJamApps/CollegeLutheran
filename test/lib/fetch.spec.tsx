/* eslint-disable @typescript-eslint/no-explicit-any */
import { Store } from 'react-notifications-component';
import superagent from 'superagent';
import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  let r: any;
  it('catches error', async () => {
    const myMock:any = jest.fn(() => ({ set: () => Promise.reject(new Error('bad')) }));
    superagent.get = myMock;
    Store.addNotification = jest.fn();
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => fun },
      superagent,
    }, '/', '');
    expect(r).toBe(false);
  });
  it('catches error when fetching homePageContent', async () => {
    const myMock:any = jest.fn(() => ({ set: () => Promise.reject(new Error('bad')) }));
    superagent.get = myMock;
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => expect(fun.data.title).toBe('') },
      superagent,
    }, '/homePageContent', '');
  });
  it('successfully runs fetchPost', async () => {
    const myMock:any = jest.fn(() => (
      { set: () => ({ set: () => ({ send: () => Promise.resolve({ status: 200 }) }) }) }
    ));
    superagent.post = myMock;
    const { status } = await fetch.fetchPost(superagent, { token: '' }, { title: '', comments: '', type: '' });
    expect(typeof status).toBe('number');
  });
});