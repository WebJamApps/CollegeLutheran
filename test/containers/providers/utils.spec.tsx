import { stewardshipEnabled } from 'src/providers/utils';
import type { Ibook } from 'src/providers/utils';

const doc = (enabled?: boolean): Ibook => ({
  title: '', _id: '', type: 'stewardshipPageContent', enabled,
});

describe('stewardshipEnabled', () => {
  it('is true only when the stewardship doc enabled flag is true', () => {
    expect(stewardshipEnabled({ stewardshipPage: doc(true) })).toBe(true);
  });
  it('is false when enabled is false', () => {
    expect(stewardshipEnabled({ stewardshipPage: doc(false) })).toBe(false);
  });
  it('is false when enabled is absent (default hidden)', () => {
    expect(stewardshipEnabled({ stewardshipPage: doc() })).toBe(false);
  });
  it('is false when content or stewardshipPage is missing', () => {
    expect(stewardshipEnabled(undefined)).toBe(false);
    expect(stewardshipEnabled({})).toBe(false);
  });
});
