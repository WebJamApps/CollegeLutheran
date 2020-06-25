/* eslint-disable @typescript-eslint/ban-ts-comment */
import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  let r: string;
  it('catches error', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => fun },
      // @ts-ignore
      superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) },
    }, '/', '');
    expect(r).toBe('bad');
  });
  it('catches error when fetching homePageContent', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => expect(fun.data.title).toBe('') },
      // @ts-ignore
      superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) },
    }, '/homePageContent', '');
  });
});
