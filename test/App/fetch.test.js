import fetch from '../../src/App/fetch';

describe('fetch', () => {
  let r;
  it('catches error', async () => {
    r = await fetch({ props: { dispatch: (fun) => fun }, superagent: { get: () => ({ set: () => Promise.reject(new Error('bad')) }) } }, '/', '');
    expect(r).toBe(false);
  });
});
