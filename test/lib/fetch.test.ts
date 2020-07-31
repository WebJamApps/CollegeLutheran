import fetch from '../../src/lib/fetch';

describe('fetch', () => {
  let r: any;
  it('catches error', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => fun },
      superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) },
    }, '/', '');
    expect(r).toBe('bad');
  });
  it('catches error when fetching homePageContent', async () => {
    r = await fetch.fetchGet({
      props: { dispatch: (fun: any) => expect(fun.data.title).toBe('') },
      superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) },
    }, '/homePageContent', '');
  });
});
