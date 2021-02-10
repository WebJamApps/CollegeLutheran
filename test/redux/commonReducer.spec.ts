/* eslint-disable @typescript-eslint/no-explicit-any */
import reducer from '../../src/redux/reducers/commonReducer';

describe('commonReducer', () => {
  const data: any = { title: 'howdy' };
  it('returns youthContent', () => {
    const youthReducer = reducer('youthContent', 'updateContent', {});
    expect(youthReducer(undefined, { type: 'updateContent', data })).toEqual(
      { youthContent: { title: 'howdy' } },
    );
  });
});
