import * as main from '../src/Main';

describe('Main', () => {
  it('renders to the root', () => {
    expect(main).toBeDefined();
    expect(document.getElementById('App')).not.toBe(null);
    expect(document.getElementById('App')).not.toBe(undefined);
  });
});
