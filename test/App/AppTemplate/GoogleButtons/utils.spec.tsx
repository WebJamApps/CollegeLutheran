import utils from 'src/App/AppTemplate/GoogleButtons/utils';
import commonUtils from 'src/lib/commonUtils';

describe('GoogleButtons/utils', () => {
  it('responseGoogleLogin fails', async () => {
    let eMessage = '';
    commonUtils.notify = vi.fn((m) => { eMessage = m; });
    await utils.responseGoogleLogin({ code: '' } as any, {} as any, vi.fn(), 'test');
    expect(eMessage).toBe('Failed to authenticate');
  });
  it('makeState', () => {
    const result = utils.makeState();
    const state = result();
    expect(typeof state).toBe('string');
  });
});
