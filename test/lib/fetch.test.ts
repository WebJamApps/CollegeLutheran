/* eslint-disable @typescript-eslint/no-explicit-any */
import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  let r: any;
  const superagent:any = { get: () => ({ set: () => Promise.reject(new Error('bad')) }) };
  it('catches error', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => fun },
      superagent,
    }, '/', '');
    expect(r).toBe('bad');
  });
  it('catches error when fetching homePageContent', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => expect(fun.data.title).toBe('') },
      superagent,
    }, '/homePageContent', '');
  });
});
