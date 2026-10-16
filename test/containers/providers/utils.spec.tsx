import { stewardshipEnabled, eventEnabled } from 'src/providers/utils';
import type { Ibook } from 'src/providers/utils';

const doc = (enabled?: boolean): Ibook => ({
  title: '', _id: '', type: 'stewardshipPageContent', enabled,
});

const eventDoc = (enabled?: boolean, title = 'Blood Drive'): Ibook => ({
  title, _id: '', type: 'eventPageContent', enabled,
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

describe('eventEnabled', () => {
  it('is true when event enabled is true and title is non-empty', () => {
    expect(eventEnabled({ eventPage: eventDoc(true, 'Blood Drive') })).toBe(true);
  });
  it('is false when enabled is false', () => {
    expect(eventEnabled({ eventPage: eventDoc(false, 'Blood Drive') })).toBe(false);
  });
  it('is false when enabled is absent', () => {
    expect(eventEnabled({ eventPage: eventDoc(undefined, 'Blood Drive') })).toBe(false);
  });
  it('is false when title is empty or only whitespace', () => {
    const spaces = ' '.repeat(3);
    expect(eventEnabled({ eventPage: eventDoc(true, '') })).toBe(false);
    expect(eventEnabled({ eventPage: eventDoc(true, spaces) })).toBe(false);
  });
  it('is false when content or eventPage is missing or null', () => {
    expect(eventEnabled(undefined)).toBe(false);
    expect(eventEnabled({})).toBe(false);
    expect(eventEnabled({ eventPage: null })).toBe(false);
  });
});

