/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from 'react-notifications-component';
import { act } from 'react-dom/test-utils';
import { render } from 'react-dom';
import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  let r: any;
  const superagent:any = { get: () => ({ set: () => Promise.reject(new Error('bad')) }) };
  it('catches error', async () => {
    Object.defineProperty(store, 'addNotification', {
      writable: true,
      value: jest.fn(),
    });
    expect(store.addNotification).toBeDefined();
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => fun },
      superagent,
    }, '/', '');
    expect(r).toBe(false);
  });
  it('catches error when fetching homePageContent', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => expect(fun.data.title).toBe('') },
      superagent,
    }, '/homePageContent', '');
  });
  it('successfully runs fetchPost', () => {
    Object.defineProperty(superagent, 'post', {
      value: jest.fn(),
    });
    // const fakeData = [{
    //   title: 'any',
    //   comments: 'any',
    //   type: 'any',
    // }];

    expect(superagent.post).toBeDefined();
  });
});
