import jsonTransform from '../../src/redux/store/jsonTransform';

describe('jsonTransform', () => {
  it('transforms cirular json dependencies', () => {
    const createTransform = (cb1, cb2) => { cb1(); cb2(); return true; };
    const JSOG = { encode: jest.fn(), decode: jest.fn() };
    expect(typeof jsonTransform.makeTransform).toBe('function');
    const ct = jsonTransform.makeTransform(createTransform, JSOG);
    expect(ct).toBe(true);
  });
});