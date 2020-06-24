/* eslint-disable @typescript-eslint/ban-ts-comment */
import fetch from '../../src/App/fetch';

describe('fetch', () => {
  let r: boolean;
  it('catches error', async () => {
    r = await fetch({
      props: { dispatch: (fun: any) => fun },
      // @ts-ignore
      superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) },
    }, '/', '');
    expect(r).toBe(false);
  });
});
